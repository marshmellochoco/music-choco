import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import defaultImg from "../images/defaultImg.png";
import useAxios from "../api/useAxios";
import ErrorPage from "./ErrorPage";

const LibraryPage = () => {
    const {
        data: playlists,
        isLoading: playlistLoading,
        error: playlistError,
    } = useAxios("get", `/library/playlist`);

    return !playlistError ? (
        <div className="content page-content">
            <h1 className="title">Library</h1>
            {!playlistLoading && playlists.length !== 0 && (
                <h2 className="title2">Playlists</h2>
            )}
            {playlistLoading ? (
                <Skeleton />
            ) : (
                playlists.map((playlist) => {
                    return (
                        <Link
                            to={`/playlist/${playlist._id}`}
                            key={playlist._id}
                            className="grid grid-cols-3 md:grid-cols-4 gap-4 hover:bg-pink-100 h-36 object-scale-down"
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
                            <div className="col-span-2 md:col-span-3 flex items-center">
                                {playlist.name}
                            </div>
                        </Link>
                    );
                })
            )}
        </div>
    ) : (
        <ErrorPage />
    );
};

export default LibraryPage;
