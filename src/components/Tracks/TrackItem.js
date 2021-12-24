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
    const { data: playlistData, isLoading } = useAxios(
        "get",
        `/library/playlist`
    );

    const addTrack = (track) => {
        if (queue.length === 0) {
            dispatch(setPlaying(false));
            dispatch(setPlayingTrack(track));
        }
        if (queue.filter((x) => x._id === track._id).length === 0)
            dispatch(addQueue(track));
    };

    const playTrack = (track) => {
        addTrack(track);
        if (track._id !== playingTrack._id) dispatch(setPlayingTrack(track));
        dispatch(setPlaying(true));
    };

    const addTrackToPlaylist = (playlist, track) => {
        if (playlist.tracks.includes(track._id)) {
            let err = "This track is already added in the playlist";
            alert.error(err);
            return;
        }
        let newPlaylist = { ...playlist };
        newPlaylist.tracks = [...newPlaylist.tracks, track._id];
        addPlaylistTrack(newPlaylist)
            .then((res) => {
                alert.show("Added to playlist");
            })
            .catch((err) => alert.error(err));
    };

    const addTrackToNewPlaylist = () => {
        addPlaylist({ name }).then((res) => {
            window.location.reload();
            addPlaylistTrack({ ...res, tracks: [t._id] }).catch((err) =>
                alert.error(err)
            );
        });
    };

    return (
        <div key={t._id}>
            <Modal
                header={"New Playlist"}
                open={openModal}
                onConfirm={addTrackToNewPlaylist}
                onCancel={() => setOpenModal(false)}
            >
                <div className="flex flex-col gap-1">
                    <label for="textInput">
                        <b>Name</b>
                    </label>
                    <input
                        id="textInput"
                        type="text"
                        placeholder="Playlist name"
                        autoFocus={true}
                        onChange={(e) => setName(e.target.value)}
                        className="border-b border-red-200 px-2 py-1"
                    />
                </div>
            </Modal>
            <ContextMenuTrigger id={`songListContextMenu_${t._id}`}>
                <div
                    onClick={(e) => {
                        if (!e.target.className.includes("link-item"))
                            playTrack(t);
                    }}
                >
                    <div
                        className={`track-item cursor-pointer ${
                            playingTrack && playingTrack._id === t._id
                                ? "bg-red-100 hover:bg-red-200"
                                : ""
                        }`}
                    >
                        <div className="number">{i}</div>
                        <div className="items">
                            <div>
                                <h3 className="font-bold">{t.title}</h3>
                                <div className="artist-list">
                                    {t.artists.map((artist) => (
                                        <Link
                                            to={`/artist/${artist._id}`}
                                            className="link-item"
                                            key={artist._id}
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {album ? (
                                <Link
                                    to={`/album/${t.album._id}`}
                                    className="link-item"
                                >
                                    {t.album.name}
                                </Link>
                            ) : (
                                <span />
                            )}
                            <span className="text-left">
                                {(t.duration / 60 < 10 ? "0" : "") +
                                    Math.floor(t.duration / 60)}
                                :
                                {(t.duration % 60 < 10 ? "0" : "") +
                                    Math.floor(t.duration % 60)}
                            </span>
                        </div>
                        <hr />
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenu id={`songListContextMenu_${t._id}`}>
                <MenuItem onClick={() => playTrack(t)}>Play</MenuItem>
                <MenuItem onClick={() => addTrack(t)}>Add to queue</MenuItem>
                <SubMenu title="Add to playlist">
                    <MenuItem onClick={() => setOpenModal(true)}>
                        Add to new playlist
                    </MenuItem>
                    <hr className="border-t border-red-300 mx-2" />
                    {!isLoading &&
                        playlistData.playlists.map((p) => {
                            return (
                                <MenuItem
                                    key={p._id}
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
