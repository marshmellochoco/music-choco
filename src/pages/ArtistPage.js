import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { useAlert } from "react-alert";
import AlbumCard from "../components/AlbumCard";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackItem from "../components/Tracks/TrackItem";
import TrackHeader from "../components/Tracks/TrackHeader";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { addQueue } from "../store/queue/queueAction";
import useAxios from "../api/useAxios";
import { addFavArtist, removeFavArtist } from "../api/userApi";
import ErrorPage from "./ErrorPage";

const ArtistPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [added, setAdded] = useState(null);
    const [loading, setLoading] = useState(false);
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const {
        data: artistData,
        isLoading: artistLoading,
        error: artistError,
    } = useAxios("get", `/artist/${id}/`);
    const {
        data: albumData,
        isLoading: albumLoading,
        error: albumError,
    } = useAxios("get", `/artist/${id}/albums`);
    const {
        data: trackData,
        isLoading: tracksLoading,
        error: tracksError,
    } = useAxios("get", `/artist/${id}/tracks`);
    const {
        data: libraryArtist,
        isLoading: libraryArtistLoading,
        error: libraryArtistError,
    } = useAxios("get", `/library/artist`);

    const addTrack = (track) => {
        if (queue.length === 0) {
            dispatch(setPlaying(false));
            dispatch(setPlayingTrack(track));
        }
        if (queue.filter((x) => x._id === track._id).length === 0)
            dispatch(addQueue(track));
    };

    const playArtist = () => {
        trackData.tracks.forEach((track, i) => {
            if (i === 0) {
                addTrack(track);
                if (track._id !== playingTrack._id)
                    dispatch(setPlayingTrack(track));
                dispatch(setPlaying(true));
            } else addTrack(track);
        });
    };

    const addArtist = () => {
        setLoading(true);
        addFavArtist(libraryArtist.artists, id)
            .then(() => {
                setAdded(true);
                alert.show("Artist added");
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert.error("Something went wrong when adding artist");
            });
    };

    const removeArtist = () => {
        setLoading(true);
        removeFavArtist(libraryArtist.artists, id)
            .then(() => {
                setAdded(false);
                alert.show("Artist removed");
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert.error("Something went wrong when removing artist");
            });
    };

    const artistInLibrary = () => {
        if (artistLoading || libraryArtistLoading) return true;
        let id = libraryArtist.artists.map((a) => a._id);
        if (added !== null) return added;
        else return id.includes(artistData._id);
    };

    return !artistError &&
        !albumError &&
        !tracksError &&
        !libraryArtistError ? (
        <div className="content page-content">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-8">
                    {artistLoading ? (
                        <>
                            <Skeleton
                                borderRadius={100}
                                width={"12rem"}
                                height={"12rem"}
                            />
                            <Skeleton width={"10rem"} className="title" />
                        </>
                    ) : (
                        <>
                            <img
                                src={artistData && artistData.image}
                                alt={artistData && artistData.name}
                                className={`w-48 h-48 border border-red-200 rounded-full`}
                            />
                            <div className="w-full">
                                <h1 className="title">
                                    {artistData && artistData.name}
                                </h1>
                                <div className="flex justify-start gap-2">
                                    <button
                                        className="btn btn-sm w-1/2 btn-confirm md:w-48"
                                        onClick={playArtist}
                                    >
                                        Play
                                    </button>
                                    {!libraryArtistLoading &&
                                        (artistInLibrary() ? (
                                            <button
                                                className={`btn btn-sm w-1/2 md:w-48 bg-gray-200 ${
                                                    loading && "opacity-40"
                                                }`}
                                                onClick={removeArtist}
                                                disabled={loading}
                                            >
                                                Remove from Library
                                            </button>
                                        ) : (
                                            <button
                                                className={`btn btn-sm w-1/2 md:w-48${
                                                    loading && "opacity-40"
                                                }`}
                                                onClick={addArtist}
                                                disabled={loading}
                                            >
                                                Add to Library
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <h2 className="title2">Tracks</h2>
                    <TrackHeader />
                    {tracksLoading
                        ? [1, 2, 3, 4, 5].map((_, i) => (
                              <TrackSkeleton key={i} id={i} />
                          ))
                        : trackData.tracks.map((track, i) => (
                              <TrackItem key={i} t={track} i={i + 1} />
                          ))}
                </div>
                <div>
                    <h2 className="title2">Albums</h2>
                    <div className="card-list">
                        {albumLoading
                            ? [1, 2, 3].map((_, i) => (
                                  <div
                                      key={`album_skeleton_${i}`}
                                      className="card"
                                  >
                                      <div className="card-link">
                                          <Skeleton
                                              className="album-image"
                                              height={240}
                                          />
                                          <Skeleton className="title2 mt-4" />
                                      </div>
                                      <div className="artistList">
                                          <Skeleton className="linkItem" />
                                      </div>
                                  </div>
                              ))
                            : albumData.items.map((album) => {
                                  return (
                                      <AlbumCard
                                          album={album}
                                          key={album._id}
                                      />
                                  );
                              })}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <ErrorPage />
    );
};

export default ArtistPage;
