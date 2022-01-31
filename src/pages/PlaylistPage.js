import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from "@mdi/js";
import defaultImg from "../images/defaultImg.png";
import useAxios from "../api/useAxios";
import {
    addPlaylistToLibrary,
    deletePlaylist,
    removePlaylistFromLibrary,
    removePlaylistTrack,
    updatePlaylist,
} from "../api/userApi";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackItem from "../components/Tracks/TrackItem";
import TrackHeader from "../components/Tracks/TrackHeader";
import Modal from "../components/Modal";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { addQueue } from "../store/queue/queueAction";
import ErrorPage from "./ErrorPage";
import { useAlert } from "react-alert";
import { MenuItem } from "react-contextmenu";

const PlaylistPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const [added, setAdded] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [name, setName] = useState("");
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const { uid } = useSelector((state) => state.userReducer);
    const {
        data: playlistData,
        isLoading: playlistLoading,
        error: playlistError,
    } = useAxios(`/playlists/${id}/`);
    const {
        data: trackData,
        isLoading: trackLoading,
        error: trackError,
        fetchData,
    } = useAxios(`/playlists/${id}/tracks`);
    const {
        data: libraryPlaylist,
        isLoading: libraryPlaylistLoading,
        error: libraryPlaylistError,
    } = useAxios(`/me/library/playlists`);

    const addTrack = (track) => {
        if (queue.length === 0) {
            dispatch(setPlaying(false));
            dispatch(setPlayingTrack(track));
        }
        if (queue.filter((x) => x.id === track.id).length === 0)
            dispatch(addQueue(track));
    };

    const playPlaylist = () => {
        trackData.items.forEach((track, i) => {
            if (i === 0) {
                addTrack(track);
                if (playingTrack && track.id !== playingTrack.id)
                    dispatch(setPlayingTrack(track));
                dispatch(setPlaying(true));
            } else addTrack(track);
        });
    };

    const editPlaylist = () => {
        updatePlaylist(id, name).then(() => {
            setEditModal(false);
            alert.show("Playlist name updated");
            history.go(0);
        });
    };

    const removePlaylist = () => {
        deletePlaylist(id).then(() => {
            setDeleteModal(false);
            alert.show("Playlist removed");
            history.goBack();
        });
    };

    const removeTrackFromPlaylist = (track) => {
        removePlaylistTrack(id, track).then(() => {
            fetchData();
            alert.show("Removed from playlist");
        });
    };

    const addLibraryPlaylist = () => {
        setLoading(true);
        addPlaylistToLibrary(id)
            .then(() => {
                setAdded(true);
                alert.show("Playlist added");
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert.error("Something went wrong when adding album");
            });
    };

    const removeLibraryPlaylist = () => {
        setLoading(true);
        removePlaylistFromLibrary(id)
            .then(() => {
                setAdded(false);
                alert.show("Playlist removed");
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert.error("Something went wrong when removing album");
            });
    };

    const formatDate = (date) => {
        let d = new Date(date);
        const currentMonth = d.getMonth();
        const monthString =
            currentMonth >= 10 ? currentMonth + 1 : `0${currentMonth + 1}`;
        const currentDate = d.getDate();
        // const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${d.getFullYear()}-${monthString}-${currentDate}`;
    };

    const playlistInLibrary = () => {
        if (playlistLoading || libraryPlaylistLoading) return true;
        let id = libraryPlaylist.items.map((a) => a.id);
        if (added !== null) return added;
        else return id.includes(playlistData.id);
    };

    return !playlistError && !trackError && !libraryPlaylistError ? (
        <div className="page-content">
            <Modal
                header={"Edit playlist"}
                open={editModal}
                onConfirm={editPlaylist}
                onCancel={() => setEditModal(false)}
            >
                {!playlistLoading && (
                    <div className="flex flex-col gap-1">
                        <label htmlFor="textInput">
                            <b>Name</b>
                        </label>
                        <input
                            id="textInput"
                            type="text"
                            placeholder="Playlist name"
                            defaultValue={playlistData.name}
                            autoFocus={true}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") editPlaylist();
                                else if (e.key === "Escape")
                                    setEditModal(false);
                            }}
                            className="border-b border-red-200 px-2 py-1"
                        />
                    </div>
                )}
            </Modal>
            <Modal
                header={"Delete playlist"}
                open={deleteModal}
                onConfirm={removePlaylist}
                onCancel={() => setDeleteModal(false)}
            >
                {!playlistLoading && (
                    <>
                        Are you sure that you want to delete{" "}
                        <b>{playlistData.name}</b>
                    </>
                )}
            </Modal>
            <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
                {playlistLoading ? (
                    <div className="w-full">
                        <Skeleton
                            className="m-2 ml-0"
                            style={{ aspectRatio: "1" }}
                        />
                        <Skeleton className="title" />
                        <Skeleton count={3} />
                        <button className="btn-primary w-full mt-2">
                            Play
                        </button>
                        <button className="btn-primary w-full mt-2">
                            Add to library
                        </button>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="border border-red-200 m-2 ml-0 text-center">
                            <img
                                src={playlistData.image}
                                alt="Playlist Thumbnail"
                                className="m-auto"
                                onError={(e) => {
                                    e.target.src = defaultImg;
                                }}
                            />
                        </div>
                        <h1 className="title">{playlistData.name}</h1>
                        <div>
                            <b>{playlistData.owner.displayName}</b>
                            <p>
                                <i>Last Update: </i>
                                <br className="hidden sm:block" />
                                {formatDate(playlistData.updatedAt)}
                            </p>
                        </div>
                        <div>Tracks: {playlistData.tracks.total}</div>
                        <div className="flex">
                            <div
                                className="rounded-full hover:bg-red-200 p-1 cursor-pointer"
                                onClick={() => setEditModal(true)}
                            >
                                <Icon
                                    path={mdiPencil}
                                    className="icon-small fill-current text-red-300"
                                    title="Edit playlist"
                                />
                            </div>
                            <div
                                className="rounded-full hover:bg-red-200 p-1 cursor-pointer"
                                onClick={() => setDeleteModal(true)}
                            >
                                <Icon
                                    path={mdiTrashCan}
                                    className="icon-small fill-current text-red-300"
                                    title="Delete playlist"
                                />
                            </div>
                        </div>
                        <button
                            className="btn-primary w-full mt-2"
                            onClick={playPlaylist}
                        >
                            Play
                        </button>
                        {!libraryPlaylistLoading &&
                            playlistData.owner.id !== uid &&
                            (playlistInLibrary() ? (
                                <button
                                    className="btn-secondary w-full mt-2"
                                    onClick={removeLibraryPlaylist}
                                    disabled={loading}
                                >
                                    Remove from Library
                                </button>
                            ) : (
                                <button
                                    className="w-full mt-2"
                                    onClick={addLibraryPlaylist}
                                    disabled={loading}
                                >
                                    Add to Library
                                </button>
                            ))}
                    </div>
                )}
                {trackLoading ? (
                    <div className="sm:col-span-2 md:col-span-3">
                        <h2 className="title2">Tracks</h2>
                        <TrackHeader />
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <TrackSkeleton key={i} id={i} />
                        ))}
                    </div>
                ) : (
                    <div className="sm:col-span-2 md:col-span-3">
                        <h2 className="title2">Tracks</h2>
                        <TrackHeader />
                        {trackData.total === 0 && (
                            <div className="flex justify-center mt-4">
                                <p>This playlist is currently empty</p>
                            </div>
                        )}
                        {trackData.items.map((track, i) => (
                            <TrackItem key={i} t={track} i={i + 1}>
                                <MenuItem
                                    onClick={() =>
                                        removeTrackFromPlaylist(track.id)
                                    }
                                >
                                    Remove from this playlist
                                </MenuItem>
                            </TrackItem>
                        ))}
                    </div>
                )}
            </div>
        </div>
    ) : (
        <ErrorPage />
    );
};

export default PlaylistPage;
