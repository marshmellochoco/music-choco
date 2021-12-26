import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import defaultImg from "../images/defaultImg.png";
import useAxios from "../api/useAxios";
import ErrorPage from "./ErrorPage";

const LibraryPage = () => {
    const {
        data: playlistData,
        isLoading: playlistLoading,
        error: playlistError,
    } = useAxios(`/library/playlist`);

    const {
        data: albumData,
        isLoading: albumLoading,
        error: albumError,
    } = useAxios(`/library/album`);

    const {
        data: artistData,
        isLoading: artistLoading,
        error: artistError,
    } = useAxios(`/library/artist`);

    return !playlistError && !albumError && !artistError ? (
        <div className="page-content">
            <h1 className="title">Library</h1>
            {!playlistLoading &&
                playlistData.count === 0 &&
                !albumLoading &&
                albumData.count === 0 &&
                !artistLoading &&
                artistData.count === 0 && (
                    <>
                        <div>
                            You have not added anything into your library.
                        </div>
                        <Link to="/" className="btn btn-primary w-max">
                            Go to Homepage
                        </Link>
                    </>
                )}
            <>
                {!playlistLoading && playlistData.count !== 0 && (
                    <h2 className="title2">Playlists</h2>
                )}
                {playlistLoading ? (
                    <div className="library-item">
                        <Skeleton height={"8rem"} className="m-0.5 p-2" />
                        <Skeleton />
                    </div>
                ) : (
                    playlistData.playlists.map((playlist) => {
                        return (
                            <Link
                                to={`/playlist/${playlist._id}`}
                                key={playlist._id}
                                className="library-item hover:bg-pink-100 object-scale-down"
                            >
                                <div className="library-image">
                                    <img
                                        src={playlist.image}
                                        alt={playlist.name}
                                        onError={(e) =>
                                            (e.target.src = defaultImg)
                                        }
                                    />
                                </div>
                                <div className="library-name">
                                    {playlist.name}
                                </div>
                            </Link>
                        );
                    })
                )}
            </>
            <>
                {!albumLoading && albumData.count !== 0 && (
                    <h2 className="title2">Liked Albums</h2>
                )}
                {albumLoading ? (
                    <div className="library-item">
                        <Skeleton height={"8rem"} className="m-0.5 p-2" />
                        <Skeleton />
                    </div>
                ) : (
                    albumData.albums.map((album) => {
                        return (
                            <Link
                                to={`/album/${album._id}`}
                                key={album._id}
                                className="library-item hover:bg-pink-100 object-scale-down"
                            >
                                <div className="library-image">
                                    <img src={album.image} alt={album.name} />
                                </div>
                                <div className="library-name">{album.name}</div>
                            </Link>
                        );
                    })
                )}
            </>
            <>
                {!artistLoading && artistData.count !== 0 && (
                    <h2 className="title2">Liked Artists</h2>
                )}
                {artistLoading ? (
                    <div className="library-item">
                        <Skeleton height={"8rem"} className="m-0.5 p-2" />
                        <Skeleton />
                    </div>
                ) : (
                    artistData.artists.map((artist) => {
                        return (
                            <Link
                                to={`/artist/${artist._id}`}
                                key={artist._id}
                                className="library-item hover:bg-pink-100 object-scale-down"
                            >
                                <div className="library-image">
                                    <img src={artist.image} alt={artist.name} />
                                </div>
                                <div className="library-name">
                                    {artist.name}
                                </div>
                            </Link>
                        );
                    })
                )}
            </>
        </div>
    ) : (
        <ErrorPage />
    );
};

export default LibraryPage;
