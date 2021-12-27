import { Link } from "react-router-dom";

const AudioPlayerTrack = ({ playingTrack }) => {
    return (
        <div className="player-track">
            <Link
                to={`/album/${playingTrack.album._id}`}
                className="track-image"
                title={`${playingTrack.album.name}`}
            >
                <img
                    src={playingTrack.album.image}
                    alt={`${playingTrack.album.name}`}
                />
            </Link>
            <div className="track-detail">
                <Link
                    to={`/album/${playingTrack.album._id}`}
                    className="hover:text-red-500"
                    title={playingTrack.title}
                >
                    <b>{playingTrack.title}</b>
                </Link>
                <div className="artist-list h-6">
                    {playingTrack.artists &&
                        playingTrack.artists.map((artist) => (
                            <Link
                                to={`/artist/${artist._id}`}
                                key={artist._id}
                                className="link-item"
                                title={artist.name}
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
