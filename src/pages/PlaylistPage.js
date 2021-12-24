import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from "@mdi/js";
import defaultImg from "../images/defaultImg.png";
import useAxios from "../api/useAxios";
import { deletePlaylist, updatePlaylist } from "../api/userApi";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackItem from "../components/Tracks/TrackItem";
import TrackHeader from "../components/Tracks/TrackHeader";
import Modal from "../components/Modal";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { addQueue } from "../store/queue/queueAction";
import ErrorPage from "./ErrorPage";

const PlaylistPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [name, setName] = useState("");
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const {
        data: playlistData,
        isLoading: playlistLoading,
        error: playlistError,
    } = useAxios("get", `/playlist/${id}/`);
    const {
        data: trackData,
        isLoading: trackLoading,
        error: trackError,
    } = useAxios("get", `/playlist/${id}/tracks`);

    const addTrack = (track) => {
        if (queue.length === 0) {
            dispatch(setPlaying(false));
            dispatch(setPlayingTrack(track));
        }
        if (queue.filter((x) => x._id === track._id).length === 0)
            dispatch(addQueue(track));
    };

    const playPlaylist = () => {
        trackData.tracks.forEach((track, i) => {
            if (i === 0) {
                addTrack(track);
                if (track._id !== playingTrack._id)
                    dispatch(setPlayingTrack(track));
                dispatch(setPlaying(true));
            } else addTrack(track);
        });
    };

    const editPlaylist = () => {
        updatePlaylist(id, name, playlistData.image).then(() => {
            setEditModal(false);
            history.go(0);
        });
    };

    const removePlaylist = () => {
        deletePlaylist(id).then(() => {
            setDeleteModal(false);
            history.goBack();
        });
    };

    const formatDate = (date) => {
        let d = new Date(date);
        const currentMonth = d.getMonth();
        const monthString =
            currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = d.getDate();
        // const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${d.getFullYear()}-${monthString}-${currentDate}`;
    };

    return !playlistError && !trackError ? (
        <div className="page-content">
            <Modal
                header={"Edit playlist"}
                open={editModal}
                onConfirm={editPlaylist}
                onCancel={() => setEditModal(false)}
            >
                {!playlistLoading && (
                    <div className="flex flex-col gap-1">
                        <label for="textInput">
                            <b>Name</b>
                        </label>
                        <input
                            id="textInput"
                            type="text"
                            placeholder="Playlist name"
                            defaultValue={playlistData.name}
                            autoFocus={true}
                            onChange={(e) => setName(e.target.value)}
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
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="border border-red-200 m-2 ml-0">
                            <img
                                src={playlistData.image}
                                alt="Playlist Thumbnail"
                                onError={(e) => {
                                    e.target.src = defaultImg;
                                }}
                            />
                        </div>
                        <h1 className="title">{playlistData.name}</h1>
                        <div>
                            <b>{playlistData.creator}</b>
                            <p>
                                <i>Created At: </i>
                                <br />
                                {formatDate(playlistData.createdAt)}
                            </p>
                            <p>
                                <i>Last Update: </i>
                                <br />
                                {formatDate(playlistData.updatedAt)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>Tracks: {playlistData.tracks.length}</div>
                            <div className="flex">
                                <div
                                    className="rounded-full hover:bg-red-200 p-1 cursor-pointer"
                                    onClick={() => setEditModal(true)}
                                >
                                    <Icon
                                        path={mdiPencil}
                                        className="icon-small fill-current text-pink-600"
                                        title="Edit playlist"
                                    />
                                </div>
                                <div
                                    className="rounded-full hover:bg-red-200 p-1 cursor-pointer"
                                    onClick={() => setDeleteModal(true)}
                                >
                                    <Icon
                                        path={mdiTrashCan}
                                        className="icon-small fill-current text-pink-600"
                                        title="Delete playlist"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn-primary w-full mt-2"
                            onClick={playPlaylist}
                        >
                            Play
                        </button>
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
                        {trackData.tracks.map((track, i) => (
                            <TrackItem key={i} t={track} i={i + 1} />
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
