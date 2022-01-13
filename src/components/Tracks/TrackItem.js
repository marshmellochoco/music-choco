import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    ContextMenu,
    ContextMenuTrigger,
    MenuItem,
    SubMenu,
} from "react-contextmenu";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { setPlaying, setPlayingTrack } from "../../store/player/playerAction";
import { addQueue } from "../../store/queue/queueAction";
import useAxios from "../../api/useAxios";
import { addPlaylist, addPlaylistTrack } from "../../api/userApi";
import Modal from "../Modal";

const TrackItem = ({ t, children, i, album = false }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const {
        data: playlistData,
        isLoading,
        fetchData,
    } = useAxios(`/me/library/playlists`);

    const addTrack = (track) => {
        if (queue.length === 0) {
            dispatch(setPlaying(false));
            dispatch(setPlayingTrack(track));
        }
        if (queue.filter((x) => x.id === track.id).length === 0)
            dispatch(addQueue(track));
    };

    const playTrack = (track) => {
        addTrack(track);
        if (track.id !== playingTrack.id) dispatch(setPlayingTrack(track));
        dispatch(setPlaying(true));
    };

    const addTrackToPlaylist = (playlist, track) => {
        if (playlist.tracks.includes(track.id)) {
            let err = "This track is already added in the playlist";
            alert.error(err);
            return;
        }
        let newPlaylist = { ...playlist };
        newPlaylist.tracks = [...newPlaylist.tracks, track.id];
        addPlaylistTrack(newPlaylist)
            .then(() => {
                alert.show("Added to playlist");
            })
            .catch((err) => alert.error(err));
    };

    const addTrackToNewPlaylist = () => {
        addPlaylist({ name }).then((res) => {
            fetchData();
            addPlaylistTrack({ ...res, tracks: [t.id] })
                .then(() => {
                    setOpenModal(false);
                    alert.show("Added to playlist");
                })
                .catch((err) => alert.error(err));
        });
    };

    return (
        <div key={`track_item_${t.id}`}>
            <Modal
                header={"New Playlist"}
                open={openModal}
                onConfirm={addTrackToNewPlaylist}
                onCancel={() => setOpenModal(false)}
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="textInput">
                        <b>Name</b>
                    </label>
                    <input
                        id="textInput"
                        type="text"
                        placeholder="Playlist name"
                        autoFocus={true}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addTrackToNewPlaylist();
                            else if (e.key === "Escape") setOpenModal(false);
                        }}
                        className="border-b border-red-200 px-2 py-1"
                    />
                </div>
            </Modal>
            <ContextMenuTrigger id={`songListContextMenu_${t.id}`}>
                <div
                    onClick={(e) => {
                        if (!e.target.className.includes("link-item"))
                            playTrack(t);
                    }}
                >
                    <div
                        className={`track-item cursor-pointer ${
                            playingTrack && playingTrack.id === t.id
                                ? "bg-red-100 hover:bg-red-200"
                                : ""
                        }`}
                    >
                        <div className="number">{i}</div>
                        <div className="items">
                            <div
                                className={album ? "col-span-2" : "col-span-3"}
                            >
                                <h3 className="font-bold">{t.name}</h3>
                                <div className="artist-list h-6">
                                    {t.artists.map((artist) => (
                                        <Link
                                            to={`/artist/${artist.id}`}
                                            className="link-item"
                                            key={`track_item_artist_${artist.id}`}
                                            title={artist.name}
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {album ? (
                                <Link
                                    to={`/album/${t.album.id}`}
                                    className="link-item"
                                    title={t.album.name}
                                >
                                    {t.album.name}
                                </Link>
                            ) : (
                                <span />
                            )}
                        </div>
                        <span className="text-right w-20 pr-4">
                            {(t.duration / 60 < 10 ? "0" : "") +
                                Math.floor(t.duration / 60)}
                            :
                            {(t.duration % 60 < 10 ? "0" : "") +
                                Math.floor(t.duration % 60)}
                        </span>
                        <hr />
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenu id={`songListContextMenu_${t.id}`}>
                <MenuItem onClick={() => playTrack(t)}>Play</MenuItem>
                <MenuItem onClick={() => addTrack(t)}>Add to queue</MenuItem>
                <SubMenu title="Add to playlist">
                    <MenuItem onClick={() => setOpenModal(true)}>
                        Add to new playlist
                    </MenuItem>
                    <hr className="border-t border-red-300 mx-2" />
                    {!isLoading &&
                        playlistData.items.map((p) => {
                            return (
                                <MenuItem
                                    key={`track_item_ctx_${p.id}`}
                                    onClick={() => addTrackToPlaylist(p, t)}
                                >
                                    {p.name}
                                </MenuItem>
                            );
                        })}
                </SubMenu>
                <hr className="border-t border-white mx-2" />
                {children}
            </ContextMenu>
        </div>
    );
};

export default TrackItem;
