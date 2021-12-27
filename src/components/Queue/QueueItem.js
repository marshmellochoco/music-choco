import { Link } from "react-router-dom";

const QueueItem = ({ item }) => {
    const getDuration = (duration) => {
        return (
            (duration / 60 < 10 ? "0" : "") +
            Math.floor(duration / 60) +
            ":" +
            (duration % 60 < 10 ? "0" : "") +
            Math.floor(duration % 60)
        );
    };

    return (
        <li className="queue-item">
            <div className="item-title">
                <b>{item.title}</b>
                <div className="artist-list h-6">
                    {item.artists.map((a) => (
                        <Link
                            key={a._id}
                            to={`/artist/${a._id}`}
                            className="link-item"
                            title={a.name}
                        >
                            {a.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="item-album">
                <Link
                    to={`/album/${item.album._id}`}
                    className="link-item"
                    title={item.album.name}
                >
                    {item.album.name}
                </Link>
            </div>
            <div className="text-right">{getDuration(item.duration)}</div>
        </li>
    );
};

export default QueueItem;
