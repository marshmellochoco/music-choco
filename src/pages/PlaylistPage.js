import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { mdiMusic } from "@mdi/js";
import Icon from "@mdi/react";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackItem from "../components/Tracks/TrackItem";
import useAxios from "../api/useAxios";
import ErrorPage from "./ErrorPage";

const PlaylistPage = () => {
    const { id } = useParams();
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const {
        data: playlist,
        isLoading,
        error,
    } = useAxios("get", `/playlist/${id}/`);

    return !error ? (
        <div className="content page-content">
            <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
                {isLoading ? (
                    <>
                        <div className="w-full">
                            <Skeleton
                                className="m-2 ml-0"
                                style={{ aspectRatio: "1" }}
                            />
                            <Skeleton className="title" />
                            <Skeleton count={3} />
                            <button className="btn btn-sm btn-confirm w-full mt-2">
                                Play
                            </button>
                        </div>
                        <div className="sm:col-span-2 md:col-span-3">
                            <h2 className="title2">Tracks</h2>
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <TrackSkeleton key={i} id={i} />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full">
                            <div className="border border-red-200 m-2 ml-0">
                                {playlist.image === "" ? (
                                    <Icon
                                        path={mdiMusic}
                                        className="bg-pink-200 text-white"
                                    />
                                ) : (
                                    <img
                                        src={playlist.image}
                                        alt="Playlist Thumbnail"
                                    />
                                )}
                            </div>
                            <h1 className="title">{playlist.name}</h1>
                            <div>
                                <p>{playlist.creator}</p>
                                <p>Created At: {playlist.createdAt}</p>
                                <p>Last Update: {playlist.updatedAt}</p>
                            </div>
                            <button className="btn btn-sm btn-confirm w-full mt-2">
                                Play
                            </button>
                        </div>
                        <div className="sm:col-span-2 md:col-span-3">
                            <h2 className="title2">Tracks</h2>
                            {playlist.tracks.map((track, i) => {
                                return (
                                    <TrackItem
                                        key={i}
                                        t={track}
                                        playingTrack={playingTrack}
                                        queue={queue}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    ) : (
        <ErrorPage />
    );
};

export default PlaylistPage;
