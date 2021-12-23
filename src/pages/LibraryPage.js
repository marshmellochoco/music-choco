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
    } = useAxios("get", `/library/playlist`);

    const {
        data: albumData,
        isLoading: albumLoading,
        error: albumError,
    } = useAxios("get", `/library/album`);

    const {
        data: artistData,
        isLoading: artistLoading,
        error: artistError,
    } = useAxios("get", `/library/artist`);

    return !playlistError && !albumError && !artistError ? (
        <div className="content page-content">
            <h1 className="title">Library</h1>
            <>
                {!playlistLoading && playlistData.count !== 0 && (
                    <h2 className="title2">Playlists</h2>
                )}
                {playlistLoading ? (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 hover:bg-pink-100 h-36 items-center">
                        <Skeleton
                            height={"8rem"}
                            style={{ margin: "0.5rem" }}
                        />
                        <Skeleton />
                    </div>
                ) : (
                    playlistData.playlists.map((playlist) => {
                        return (
                            <Link
                                to={`/playlist/${playlist._id}`}
                                key={playlist._id}
                                className="grid grid-cols-3 md:grid-cols-4 gap-4 hover:bg-pink-100 h-36 object-scale-down items-center"
                            >
                                <div className="p-2">
                                    <img
                                        src={playlist.image}
                                        alt="Playlist Thumbnail"
                                        className="w-full max-h-32 object-cover"
                                        onError={(e) => {
                                            e.target.src = defaultImg;
                                        }}
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-3">
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
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 hover:bg-pink-100 h-36 items-center">
                        <Skeleton
                            height={"8rem"}
                            style={{ margin: "0.5rem" }}
                        />
                        <Skeleton />
                    </div>
                ) : (
                    albumData.albums.map((album) => {
                        return (
                            <Link
                                to={`/album/${album._id}`}
                                key={album._id}
                                className="grid grid-cols-3 md:grid-cols-4 gap-4 hover:bg-pink-100 h-36 object-scale-down items-center"
                            >
                                <div className="p-2">
                                    <img
                                        src={album.image}
                                        alt="Playlist Thumbnail"
                                        className="w-full max-h-32 object-cover"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-3">
                                    {album.name}
                                </div>
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
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 hover:bg-pink-100 h-36 items-center">
                        <Skeleton
                            height={"8rem"}
                            style={{ margin: "0.5rem" }}
                        />
                        <Skeleton />
                    </div>
                ) : (
                    artistData.artists.map((artist) => {
                        return (
                            <Link
                                to={`/artist/${artist._id}`}
                                key={artist._id}
                                className="grid grid-cols-3 md:grid-cols-4 gap-4 hover:bg-pink-100 h-36 object-scale-down items-center"
                            >
                                <div className="p-2">
                                    <img
                                        src={artist.image}
                                        alt="Playlist Thumbnail"
                                        className="w-full max-h-32 object-cover"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-3">
                                    {artist.name}
                                </div>
                            </Link>
                        );
                    })
                )}
            </>{" "}
        </div>
    ) : (
        <ErrorPage />
    );
};

export default LibraryPage;
