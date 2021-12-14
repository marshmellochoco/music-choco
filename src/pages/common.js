import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { Link } from "react-router-dom";
import { getTrack } from "../api/trackApi";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { addQueue } from "../store/queue/queueAction";
import Skeleton from "react-loading-skeleton";

export const playTrack = (dispatch, id, queue, playingTrack) => {
    addTrack(dispatch, id, queue).then((result) => {
        if (result._id !== playingTrack._id) dispatch(setPlayingTrack(result));
        dispatch(setPlaying(true));
    });
};

export const addTrack = async (dispatch, id, queue) => {
    let res;
    await getTrack(id).then((result) => {
        if (queue.length === 0) {
            dispatch(setPlayingTrack(result));
            dispatch(setPlaying(false));
        }
        if (queue.filter((x) => x._id === id).length === 0)
            dispatch(addQueue(result));
        res = result;
    });
    return res;
};

export const getTrackSkeletion = (key) => {
    return (
        <div key={`track_skeleton_${key}`}>
            <div>
                <div className="grid grid-cols-6 items-center w-full py-2 px-4 hover:bg-red-50 ">
                    <div className="col-span-3">
                        <Skeleton />
                        <div className="artistList">
                            <Skeleton className="linkItem" />
                        </div>
                    </div>
                    <div className="col-span-2" />
                    <Skeleton className="col-span-1 text-right" />
                </div>
                <hr />
            </div>
        </div>
    );
};

export const getTracksList = (dispatch, tracks, playingTrack, queue) => {
    return tracks.map((t) => (
        <div key={t._id}>
            <ContextMenuTrigger id={`songListContextMenu_${t._id}`}>
                <div
                    className="cursor-pointer"
                    onClick={(e) => {
                        if (!e.target.className.includes("hover:underline"))
                            playTrack(dispatch, t._id, queue, playingTrack);
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
                <MenuItem
                    onClick={() =>
                        playTrack(dispatch, t._id, queue, playingTrack)
                    }
                    className="menuItem"
                >
                    Play
                </MenuItem>
                <MenuItem
                    onClick={() => addTrack(dispatch, t._id, queue)}
                    className="menuItem"
                >
                    Add to queue
                </MenuItem>
            </ContextMenu>
        </div>
    ));
};
