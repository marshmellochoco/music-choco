import { Link } from "react-router-dom";

const ArtistList = ({ artists }) => {
    return (
        <div className="artist-list">
            {artists &&
                artists.map((artist) => (
                    <Link
                        to={`/artist/${artist.id}`}
                        key={`player_track_${artist.id}`}
                        className="artist-link"
                        title={artist.name}
                    >
                        {artist.name}
                    </Link>
                ))}
        </div>
    );
};

export default ArtistList;
