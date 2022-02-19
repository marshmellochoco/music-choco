import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import ArtistList from "./ArtistList";

const AlbumCard = ({ album }) => {
    const [loading, setLoading] = useState(true);

    // TODO: Context menu
    return (
        <div className="card-container">
            <Link className="card" to={`/album/${album.id}`} title={album.name}>
                <img
                    className={loading ? "hidden" : ""}
                    src={album.image}
                    alt={album.name}
                    onLoad={() => setLoading(false)}
                />
                {loading && <Skeleton height={240} />}
                <h2 className="title2 mt-2">{album.name}</h2>
            </Link>
            <ArtistList artists={album.artists} />
        </div>
    );
};

export default AlbumCard;
