import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./Album.css";

export const Album = ({
    index,
    setIndex,
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
            setIndex(queue.length);
        } else {
            setIndex(queue.indexOf(id));
        }

        setPlaying(true);
    };

    const addQueue = (id) => {
        if (!queue.includes(id)) {
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
                    queue[index] === s._id ? "activeItem" : "songItem"
                }`}
                key={s._id}
                onClick={() => setSong(s._id)}
                onContextMenu={(e) => addQueue(s._id)}
            >
                <div>{i + 1}</div>
                <div>{s.title}</div>
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
