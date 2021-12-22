import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import AlbumCard from "../components/AlbumCard";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackItem from "../components/Tracks/TrackItem";
import useAxios from "../api/useAxios";
import ErrorPage from "./ErrorPage";
import TrackHeader from "../components/Tracks/TrackHeader";

const ArtistPage = () => {
    const { id } = useParams();
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
        data: tracksData,
        isLoading: tracksLoading,
        error: tracksError,
    } = useAxios("get", `/artist/${id}/tracks`);

    // TODO: Add to library

    return !artistError && !albumError && !tracksError ? (
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
                            <div>
                                <h1 className="title">
                                    {artistData && artistData.name}
                                </h1>
                                <div className="flex justify-start gap-2">
                                    <button className="btn btn-sm w-1/2 btn-confirm md:w-48">
                                        Play
                                    </button>
                                    <button className="btn btn-sm w-1/2 md:w-48">
                                        Add to Library
                                    </button>
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
                        : tracksData.map((track, i) => (
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

// TODO: Show added to library / remove from library if added
