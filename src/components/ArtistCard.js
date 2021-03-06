import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const ArtistCard = ({ artist }) => {
    const [loaded, setLoaded] = useState(false);

    // TODO: Context menu
    return (
        <Link
            to={`/artist/${artist.id}`}
            className="card-container border border-primary-100 dark:border-primaryDark-100 hover:shadow-md"
            title={artist.name}
        >
            <div className="card">
                <img
                    className={!loaded ? "hidden" : ""}
                    src={artist.image}
                    alt={artist.name}
                    onLoad={() => setLoaded(true)}
                />
                {!loaded && <Skeleton height={240} />}
            </div>
            <div className="m-2">
                <h2 className="title2 mt-3">{artist.name}</h2>
            </div>
        </Link>
    );
};

export default ArtistCard;
