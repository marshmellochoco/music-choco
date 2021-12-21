import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackItem from "../components/Tracks/TrackItem";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { addQueue } from "../store/queue/queueAction";
import useAxios from "../api/useAxios";
import ErrorPage from "./ErrorPage";
import { addFavAlbum } from "../api/userApi";

const AlbumPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const {
        data: albumData,
        isLoading: albumLoading,
        error: albumErr,
    } = useAxios("get", `/album/${id}/`);
    const {
        data: trackData,
        isLoading: trackLoading,
        error: trackErr,
    } = useAxios("get", `/album/${id}/tracks`);

    const addTrack = (track) => {
        if (queue.length === 0) {
            dispatch(setPlaying(false));
            dispatch(setPlayingTrack(track));
        }
        if (queue.filter((x) => x._id === track._id).length === 0)
            dispatch(addQueue(track));
    };

    const playAlbum = () => {
        trackData.tracks.forEach((track, i) => {
            if (i === 0) {
                addTrack(track);
                if (track._id !== playingTrack._id)
                    dispatch(setPlayingTrack(track));
                dispatch(setPlaying(true));
            } else addTrack(track);
        });
    };

    const addAlbum = () => {
        // TODO: Prevent add when already added
        addFavAlbum(id).then((res) => console.log(res));
    };

    return !albumErr && !trackErr ? (
        <div className="content page-content">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 sm:gap-8 flex-col sm:flex-row">
                    {albumLoading && trackLoading ? (
                        <Skeleton
                            className="border border-white"
                            style={{ width: "12rem", height: "12rem" }}
                        />
                    ) : (
                        <img
                            src={albumData && albumData.image}
                            alt={albumData && albumData.name}
                            className="w-full h-full sm:w-48 sm:h-48 border border-white"
                        />
                    )}
                    <div className="w-full sm:w-full flex flex-col gap-4">
                        <div>
                            <h1 className="title">
                                {albumData && albumData.name}
                            </h1>
                            <div>
                                {albumData &&
                                    albumData.artists.map((artist) => (
                                        <Link
                                            to={`/artist/${artist._id}`}
                                            className="title2 font-normal hover:underline linkItem"
                                            key={artist._id}
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                            </div>
                            <p className="w-full mt-2">
                                Tracks: {trackData && trackData.length}
                            </p>
                        </div>
                        <div className="flex justify-start gap-2">
                            <button
                                className="btn btn-sm w-1/2 btn-confirm md:w-48"
                                onClick={playAlbum}
                            >
                                Play
                            </button>
                            <button
                                className="btn btn-sm w-1/2 md:w-48"
                                onClick={addAlbum}
                            >
                                Add to Library
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="title2">Tracks</h2>
                    {trackLoading
                        ? [1, 2, 3, 4, 5].map((_, i) => (
                              <TrackSkeleton key={i} id={i} />
                          ))
                        : trackData.tracks.map((track, i) => {
                              return <TrackItem key={i} t={track} />;
                          })}
                </div>
            </div>
        </div>
    ) : (
        <ErrorPage />
    );
};

export default AlbumPage;
