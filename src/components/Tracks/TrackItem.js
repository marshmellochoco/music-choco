import { useDispatch, useSelector } from "react-redux";
import {
    ContextMenu,
    ContextMenuTrigger,
    MenuItem,
    SubMenu,
} from "react-contextmenu";
import { Link } from "react-router-dom";
import { setPlaying, setPlayingTrack } from "../../store/player/playerAction";
import { addQueue } from "../../store/queue/queueAction";
import useAxios from "../../api/useAxios";
import { useState } from "react";
import { addPlaylist, addPlaylistTrack } from "../../api/userApi";

const TrackItem = ({ t, children }) => {
    const dispatch = useDispatch();
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const { data: playlists, isLoading } = useAxios("get", `/library/playlist`);
    const [error, setError] = useState(null);
    // TODO: Popup to show error message

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
            setError("Already exist in the playlist.");
            return;
        }
        let newPlaylist = { ...playlist };
        newPlaylist.tracks = [...newPlaylist.tracks, track._id];
        addPlaylistTrack(newPlaylist)
            .then((res) => {
                // TODO: Popup to show success
            })
            .catch((err) => setError(err));
    };

    const addTrackToNewPlaylist = (track) => {
        // TODO: Popup to enter playlist name
        addPlaylist({ name: "New Playlist" }).then((res) => {
            addPlaylistTrack({ ...res, tracks: [track._id] }).catch((err) =>
                setError(err)
            );
        });
    };

    return (
        <div key={t._id}>
            <ContextMenuTrigger id={`songListContextMenu_${t._id}`}>
                <div
                    className="cursor-pointer"
                    onClick={(e) => {
                        if (!e.target.className.includes("hover:underline"))
                            playTrack(t);
                    }}
                >
                    <div
                        className={`grid grid-cols-6 items-center w-full py-2 px-4 hover:bg-red-50 ${
                            playingTrack && playingTrack._id === t._id
                                ? "bg-red-100 hover:bg-red-200"
                                : ""
                        }`}
                    >
                        <div className="col-span-3">
                            <h3 className="font-bold">{t.title}</h3>
                            <div className="artistList">
                                {t.artists.map((artist) => (
                                    <Link
                                        to={`/artist/${artist._id}`}
                                        className="hover:underline linkItem"
                                        key={artist._id}
                                    >
                                        {artist.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <span className="col-span-2" />
                        <span className="col-span-1 text-right">
                            {(t.duration / 60 < 10 ? "0" : "") +
                                Math.floor(t.duration / 60)}
                            :
                            {(t.duration % 60 < 10 ? "0" : "") +
                                Math.floor(t.duration % 60)}
                        </span>
                    </div>
                    <hr />
                </div>
            </ContextMenuTrigger>
            <ContextMenu
                id={`songListContextMenu_${t._id}`}
                className="contextMenu"
            >
                <MenuItem onClick={() => playTrack(t)}>Play</MenuItem>
                <MenuItem onClick={() => addTrack(t)}>Add to queue</MenuItem>
                <SubMenu title="Add to playlist">
                    <MenuItem onClick={() => addTrackToNewPlaylist(t)}>
                        Add to new playlist
                    </MenuItem>
                    <hr className="border-t border-white mx-2" />
                    {!isLoading &&
                        playlists.map((p) => {
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