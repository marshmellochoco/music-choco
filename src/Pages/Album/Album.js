import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./Album.css";

export const Album = ({ queue, setQueue, setPlaying, apiUrl }) => {
    const [songs, setSongs] = useState([]);
    const [album, setAlbum] = useState("");
    const [artist, setArtist] = useState("");
    let { id } = useParams();

    useEffect(() => {
        axios.get(apiUrl + "/album/" + id).then((res) => {
            setAlbum(res.data.albumname);
            setArtist(res.data.artist);
        });

        axios
            .get(apiUrl + "/album/" + id)
            .then((res) => setSongs(res.data.songs));
    }, [id, apiUrl]);

    const setSong = (id) => {
        if (queue.includes(id)) {
            setQueue(queue.splice(queue.indexOf(id), 1));
        }
        setPlaying(false);
        setQueue([id, ...queue.slice(1, queue.length)]);
        setPlaying(true);
    };

    const addQueue = (id) => {
        if (!queue.includes(id)) {
            setQueue([...queue, id]);
        }
    };

    const getSongs = () => {
        return songs.map((s, i) => (
            <li
                className={`${queue[0] === s._id ? "activeItem" : "songItem"}`}
                key={s._id}
                onClick={() => setSong(s._id)}
                onContextMenu={(e) => addQueue(s._id)}
            >
                <div>{i + 1}</div>
                <div>{s.title}</div>
                <div>
                    {(s.duration / 60 < 10 ? "0" : "") +
                        Math.floor(s.duration / 60)}{" "}
                    :{" "}
                    {(s.duration % 60 < 10 ? "0" : "") +
                        Math.floor(s.duration % 60)}
                </div>
            </li>
        ));
    };

    return (
        <div className="albums">
            <h3>
                <Link to="/">{"<"} Back</Link>
            </h3>
            <div className="albumHeader">
                <img
                    alt={album}
                    src={`${apiUrl}/album/${id}/ico`}
                />
                <div className="album">
                    <h1>{album}</h1>
                    <h2>{artist}</h2>
                </div>
            </div>
            <ul className="songList">
                <li className="songHeader">
                    <div>#</div>
                    <div>Title</div>
                    <div>Duration</div>
                </li>
                <hr />
                {getSongs()}
            </ul>
        </div>
    );
};
