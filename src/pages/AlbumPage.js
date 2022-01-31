import { useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackHeader from "../components/Tracks/TrackHeader";
import TrackItem from "../components/Tracks/TrackItem";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { addQueue } from "../store/queue/queueAction";
import useAxios from "../api/useAxios";
import { addAlbumToLibrary, removeAlbumFromLibrary } from "../api/userApi";
import ErrorPage from "./ErrorPage";

const AlbumPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [added, setAdded] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const {
        data: albumData,
        isLoading: albumLoading,
        error: albumErr,
    } = useAxios(`/albums/${id}/`);
    const {
        data: trackData,
        isLoading: trackLoading,
        error: trackErr,
    } = useAxios(`/albums/${id}/tracks`);
    const {
        data: libraryAlbum,
        isLoading: libraryAlbumLoading,
        error: libraryAlbumError,
    } = useAxios(`/me/library/albums`);

    const addTrack = (track) => {
        if (queue.length === 0) {
            dispatch(setPlaying(false));
            dispatch(setPlayingTrack(track));
        }
        if (queue.filter((x) => x.id === track.id).length === 0)
            dispatch(addQueue(track));
    };

    const playAlbum = () => {
        trackData.items.forEach((track, i) => {
            if (i === 0) {
                addTrack(track);
                if (playingTrack && track.id !== playingTrack.id)
                    dispatch(setPlayingTrack(track));
                dispatch(setPlaying(true));
            } else addTrack(track);
        });
    };

    const addAlbum = () => {
        setLoading(true);
        addAlbumToLibrary(id)
            .then(() => {
                setAdded(true);
                alert.show("Album added");
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert.error("Something went wrong when adding album");
            });
    };

    const removeAlbum = () => {
        setLoading(true);
        removeAlbumFromLibrary(id)
            .then(() => {
                setAdded(false);
                alert.show("Album removed");
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert.error("Something went wrong when removing artist");
            });
    };

    const albumInLibrary = () => {
        if (albumLoading || libraryAlbumLoading) return true;
        let id = libraryAlbum.items.map((a) => a.id);
        if (added !== null) return added;
        else return id.includes(albumData.id);
    };

    return !albumErr && !trackErr && !libraryAlbumError ? (
        <div className="page-content">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 sm:gap-8 flex-col sm:flex-row">
                    {albumLoading && trackLoading ? (
                        <Skeleton
                            className="border border-white"
                            style={{ width: "12rem", height: "12rem" }}
                        />
                    ) : (
                        (imgLoading && (
                            <Skeleton style={{ height: "12rem" }} />
                        )) || (
                            <img
                                src={albumData && albumData.image}
                                alt={albumData && albumData.name}
                                className="w-full h-full sm:w-48 sm:h-48 border border-white"
                                onLoad={() => setImgLoading(false)}
                            />
                        )
                    )}
                    <div className="w-full sm:w-full flex flex-col gap-4">
                        <div>
                            <h1 className="title">
                                {albumData && albumData.name}
                            </h1>
                            <div className="artist-list">
                                {albumData &&
                                    albumData.artists.map((artist) => (
                                        <Link
                                            to={`/artist/${artist.id}`}
                                            className="text-base link-item"
                                            key={artist.id}
                                            title={artist.name}
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                            </div>
                            <p className="w-full mt-2">
                                Tracks: {!trackLoading && trackData.count}
                            </p>
                        </div>
                        <div className="flex justify-start gap-2">
                            <button
                                className="btn-primary w-1/2 md:w-48"
                                onClick={playAlbum}
                            >
                                Play
                            </button>
                            {!libraryAlbumLoading &&
                                (albumInLibrary() ? (
                                    <button
                                        className="btn-secondary w-1/2 md:w-48"
                                        onClick={removeAlbum}
                                        disabled={loading}
                                    >
                                        Remove from Library
                                    </button>
                                ) : (
                                    <button
                                        className="w-1/2 md:w-48"
                                        onClick={addAlbum}
                                        disabled={loading}
                                    >
                                        Add to Library
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="title2">Tracks</h2>
                    <TrackHeader />
                    {trackLoading
                        ? [1, 2, 3, 4, 5].map((_, i) => (
                              <TrackSkeleton key={i} id={i} />
                          ))
                        : trackData.items.map((track, i) => (
                              <TrackItem
                                  key={i}
                                  t={track}
                                  i={track.track_number}
                              />
                          ))}
                </div>
            </div>
        </div>
    ) : (
        <ErrorPage />
    );
};

export default AlbumPage;
