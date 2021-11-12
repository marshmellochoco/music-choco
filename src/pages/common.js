import { Link } from "react-router-dom";
import { getTrack } from "../api/trackApi";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { addQueue } from "../store/queue/queueAction";

const playTrack = (dispatch, id, playingTrack) => {
    getTrack(id).then((result) => {
        if (playingTrack._id !== id) dispatch(addQueue(result));
        dispatch(setPlayingTrack(result));
        dispatch(setPlaying(true));
    });
};

export const getTracksList = (dispatch, tracks, playingTrack) => {
    return tracks.map((t) => (
        <div
            key={t._id}
            className="cursor-pointer"
            onClick={(e) => {
                if (e.target.className !== "hover:underline")
                    playTrack(dispatch, t._id, playTrack);
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
                    {t.artists.map((artist) => (
                        <Link
                            to={`/artist/${artist._id}`}
                            className="hover:underline"
                            key={artist._id}
                        >
                            {artist.name}
                        </Link>
                    ))}
                </div>
                <span className="col-span-2 text-center">{t.album.name}</span>
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
    ));
};
