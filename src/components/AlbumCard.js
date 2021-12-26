import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const AlbumCard = ({ album }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="card-container">
            <Link className="card" to={`/album/${album._id}`}>
                <img
                    className={loading ? "hidden" : ""}
                    src={album.image}
                    alt={album.name}
                    onLoad={() => setLoading(false)}
                />
                {loading && <Skeleton height={240} />}
                <h2 className="title2 mt-2">{album.name}</h2>
            </Link>
            <div className="artist-list">
                {album.artists.map((artist) => (
                    <Link
                        to={`/artist/${artist._id}`}
                        key={`albumcard_${artist._id}`}
                        className="link-item"
                    >
                        {artist.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AlbumCard;
