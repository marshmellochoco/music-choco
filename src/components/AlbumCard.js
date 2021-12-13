import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const AlbumCard = ({ album }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="card">
            <Link className="card-link" to={`/album/${album._id}`}>
                <img
                    className={`album-image ${!loaded && "hidden"}`}
                    src={album.image}
                    alt={album.name}
                    onLoad={() => setLoaded(true)}
                />
                {!loaded && <Skeleton className="album-image" height={240} />}
                <h2 className="title2 font-bold mt-2">{album.name}</h2>
            </Link>
            <div className="artistList">
                {album.artists.map((artist) => (
                    <Link
                        to={`/artist/${artist._id}`}
                        key={artist._id}
                        className="hover:underline linkItem break-words overflow-hidden"
                    >
                        {artist.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AlbumCard;
