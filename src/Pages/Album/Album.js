import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./Album.css";

export const Album = ({
    playingSong,
    setPlayingSong,
    queue,
    setQueue,
    setPlaying,
    apiUrl,
}) => {
    const [songs, setSongs] = useState([]);
    const [album, setAlbum] = useState("");
    const [artist, setArtist] = useState("");
    const songList = [];
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

    const setSong = async (id) => {
        if (!queue.includes(id)) {
            await setQueue([...queue, id]);
        }
        setPlayingSong(id);
        setPlaying(true);
    };

    const setAlbumToQueue = async () => {
        await setQueue([]);
        setQueue(songList);
        setPlayingSong(songList[0]);
        setPlaying(true);
    };

    const addQueue = (id) => {
        if (!queue.includes(id)) {
            if (queue.length === 0) setPlayingSong(id);
            setQueue([...queue, id]);
        }
    };

    const getSongs = () => {
        songs.forEach((song) => {
            songList.push(song._id);
        });
        return songs.map((s, i) => (
            <li
                className={`${
                    playingSong === s._id ? "activeItem" : "songItem"
                }`}
                key={s._id}
                onClick={(e) =>
                    e.target.className !== "icon" ? null : setSong(s._id)
                }
                onContextMenu={(e) => addQueue(s._id)}
            >
                <div>{i + 1}</div>
                <div>{s.title}</div>
                <div className="icon" onClick={() => addQueue(s._id)}>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                    </svg>
                </div>
                <div>
                    {((s.duration - 1) / 60 < 10 ? "0" : "") +
                        Math.floor((s.duration - 1) / 60)}{" "}
                    :{" "}
                    {((s.duration - 1) % 60 < 10 ? "0" : "") +
                        Math.floor((s.duration - 1) % 60)}
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
                <img alt={album} src={`${apiUrl}/album/${id}/ico`} />
                <div className="overlay" onClick={() => setAlbumToQueue()} />

                <div className="album">
                    <h1>{album}</h1>
                    <h2>{artist}</h2>
                </div>
            </div>
            <ul className="songList">
                <li className="songHeader">
                    <div>#</div>
                    <div>Title</div>
                    <div />
                    <div>Duration</div>
                </li>
                <hr />
                {getSongs()}
            </ul>
        </div>
    );
};
