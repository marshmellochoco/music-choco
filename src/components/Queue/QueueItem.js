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
            <div className="col-span-6">
                <b>{item.title}</b>
                <div className="artistList">
                    {item.artists.map((a) => (
                        <Link
                            key={a._id}
                            to={`/artist/${a._id}`}
                            className="hover:underline linkItem"
                        >
                            {a.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="col-span-3 mr-2 artistList">
                <Link
                    to={`/album/${item.album._id}`}
                    className="hover:underline"
                >
                    {item.album.name}
                </Link>
            </div>
            <div className="text-right">{getDuration(item.duration)}</div>
        </li>
    );
};

export default QueueItem;
