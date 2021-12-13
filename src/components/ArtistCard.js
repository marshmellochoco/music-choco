import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const ArtistCard = ({ artist }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Link
            to={`/artist/${artist._id}`}
            className="card border border-red-100 card-hover"
        >
            <div>
                <img
                    className={`album-image ${!loaded && "hidden"}`}
                    src={artist.image}
                    alt={artist.name}
                    onLoad={() => setLoaded(true)}
                />
                {!loaded && <Skeleton className="album-image" height={240} />}
            </div>
            <div className="m-2">
                <h2 className="title2 mt-3 font-bold">{artist.name}</h2>
            </div>
        </Link>
    );
};

export default ArtistCard;
