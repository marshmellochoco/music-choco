import Skeleton from "react-loading-skeleton";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import useAxios from "../api/useAxios";
import ErrorPage from "./ErrorPage";

const HomePage = () => {
    const {
        data: featuredArtist,
        isLoading: artistLoading,
        error: artistError,
    } = useAxios("/featured-artists");
    const {
        data: newRelease,
        isLoading: albumLoading,
        error: albumError,
    } = useAxios("/new-release");

    const getAlbumSkeleton = (key) => {
        return (
            <div key={`album_skeleton_${key}`}>
                <div>
                    <Skeleton height={240} width={240} />
                    <Skeleton className="title2 mt-4" />
                </div>
                <Skeleton />
            </div>
        );
    };

    const getArtistSkeleton = (key) => {
        return (
            <div key={`artist_skeleton_${key}`}>
                <div>
                    <Skeleton height={240} width={240} />
                </div>
                <Skeleton className="title2 mt-3 m-2" />
            </div>
        );
    };

    return !artistError && !albumError ? (
        <div className="page-content">
            <>
                <div>
                    <h2 className="title">New Release</h2>
                    <div className="card-list">
                        {albumLoading
                            ? [1, 2, 3, 4, 5].map((_, i) => getAlbumSkeleton(i))
                            : newRelease
                                  .reverse()
                                  .map((a) => (
                                      <AlbumCard album={a} key={a._id} />
                                  ))}
                    </div>
                </div>
                <div>
                    <h2 className="title">Featured Artists</h2>
                    <div className="card-list">
                        {artistLoading
                            ? [1, 2, 3].map((_, i) => getArtistSkeleton(i))
                            : featuredArtist.map((a) => (
                                  <ArtistCard artist={a} key={a._id} />
                              ))}
                    </div>
                </div>
            </>
        </div>
    ) : (
        <ErrorPage />
    );
};

export default HomePage;
// TODO: Scrolling on mobile n click to scroll on dekstop
// https://stackoverflow.com/questions/12469875/how-to-code-css-media-queries-targeting-all-mobile-devices-and-tablets/42835826#42835826
