import { Link } from "react-router-dom";

const AlbumCard = ({ album }) => {
    return (
        <div className="card">
            <Link className="card-link" to={`/album/${album._id}`}>
                <img
                    className="album-image"
                    src={album.image}
                    alt={album.name}
                />
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
