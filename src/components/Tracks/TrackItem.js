import { useDispatch, useSelector } from "react-redux";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { Link } from "react-router-dom";
import { setPlaying, setPlayingTrack } from "../../store/player/playerAction";
import { addQueue } from "../../store/queue/queueAction";

const TrackItem = ({ t, children }) => {
    const dispatch = useDispatch();
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);

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

    const addTrackToPlaylist = (track) => {
        // TODO: implement
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
                <MenuItem onClick={() => addTrackToPlaylist(t)}>Add to playlist</MenuItem>
                {children}
            </ContextMenu>
        </div>
    );
};

export default TrackItem;

// {/* <MenuItem
//     onClick={() =>
//         playTrack(dispatch, t._id, queue, playingTrack)
//     }
//     className="menuItem"
// >
//     Play
// </MenuItem>
// <MenuItem
//     onClick={() => addTrack(dispatch, t._id, queue)}
//     className="menuItem"
// >
//     Add to queue
// </MenuItem> */
