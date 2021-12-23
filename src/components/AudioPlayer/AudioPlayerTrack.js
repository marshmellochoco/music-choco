import { Link } from "react-router-dom";

const AudioPlayerTrack = ({ playingTrack }) => {
    return (
        <div className="grid gap-2 songPlayerGrid items-center h-24">
            <Link
                to={`/album/${playingTrack.album._id}`}
                className="w-20 h-20 mb-2 ml-1 hidden md:block"
            >
                <img
                    src={playingTrack.album.image}
                    alt={`${playingTrack.album.name}`}
                    title={`${playingTrack.album.name}`}
                    className="w-20 h-20"
                />
            </Link>
            <div className="ml-2 playerArtistList overflow-hidden whitespace-nowrap overflow-ellipsis">
                <Link
                    to={`/album/${playingTrack.album._id}`}
                    className="text-pink-900 hover:text-red-500"
                >
                    <b>{playingTrack.title}</b>
                </Link>
                <div className="artistList">
                    {playingTrack.artists &&
                        playingTrack.artists.map((artist) => (
                            <Link
                                to={`/artist/${artist._id}`}
                                key={artist._id}
                                className="hover:underline linkItem text-pink-900"
                            >
                                {artist.name}
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AudioPlayerTrack;
