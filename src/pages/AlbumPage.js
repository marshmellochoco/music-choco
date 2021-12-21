import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackItem from "../components/Tracks/TrackItem";
import useAxios from "../api/useAxios";

const AlbumPage = () => {
    const { id } = useParams();
    const { data: albumData, isLoading: albumLoading } = useAxios(
        "get",
        `/album/${id}/`
    );
    const { data: trackData, isLoading: trackLoading } = useAxios(
        "get",
        `/album/${id}/tracks`
    );

    const playAlbum = () => {
        // TODO: implement
        // tracks.forEach((track, i) => {
        //     if (i === 0) playTrack(dispatch, track._id, queue, playingTrack);
        //     else addTrack(dispatch, track._id, queue);
        // });
    };

    const addAlbum = () => {
        // TODO: Implement library
    };

    return (
        <div className="content page-content">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 sm:gap-8 flex-col sm:flex-row">
                    {albumLoading ? (
                        <Skeleton
                            className="w-full h-full sm:w-48 sm:h-48 border border-white"
                            width={200}
                            height={200}
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
    );
};

export default AlbumPage;
