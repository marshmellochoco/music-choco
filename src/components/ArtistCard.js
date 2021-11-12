import { Link } from "react-router-dom";

const ArtistCard = ({ artist }) => {
    return (
        <Link
            to={`/artist/${artist._id}`}
            className="card border border-red-100 card-hover"
        >
            <div>
                <img src={artist.image} alt={artist.name} />
            </div>
            <div className="m-2">
                <h2 className="title2 mt-3 font-bold">{artist.name}</h2>
            </div>
        </Link>
    );
};

export default ArtistCard;
