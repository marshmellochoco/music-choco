// dependancy import
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// component import
import "./Album.css";

export const Album = ({ apiUrl }) => {
    const [songs, setSongs] = useState([]);
    const [album, setAlbum] = useState("");
    const [artist, setArtist] = useState("");

    const songList = [];
    let { id } = useParams();

    const playingSong = useSelector(
        (state) => state.songDataReducer.songData.songId
    );
    const queue = useSelector((state) => state.queueReducer.queue);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${apiUrl}/album/${id}`).then((res) => {
            setAlbum(res.data.albumname);
            setArtist(res.data.artist);
        });

        axios
            .get(`${apiUrl}/album/${id}`)
            .then((res) => setSongs(res.data.songs));
    }, [id, apiUrl]);

    const setSong = async (id) => {
        // play the selected song and add it to the queue
        dispatch({ type: "ADD_QUEUE", songId: id });
        dispatch({ type: "SET_PLAYING_SONG", songId: id });
        dispatch({ type: "SET_PLAYING", playing: true });
    };

    const setAlbumToQueue = async () => {
        // play the entier album and replace the existing queue
        dispatch({ type: "SET_QUEUE", queue: songList });
        dispatch({ type: "SET_PLAYING_SONG", songId: songList[0] });
        dispatch({ type: "SET_PLAYING", playing: true });
    };

    const addQueue = (id) => {
        // add the song to the queue
        if (queue.length === 0)
            dispatch({ type: "SET_PLAYING_SONG", songId: id });
        dispatch({ type: "ADD_QUEUE", songId: id });
    };

    const getSongs = () => {
        // returns a list of songs of the album as component list
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
                    e.target.getAttribute("class") !== "notToPlay"
                        ? setSong(s._id)
                        : null
                }
                onContextMenu={(e) => addQueue(s._id)}
            >
                <div>{i + 1}</div>
                <div>{s.title}</div>
                <div className="icon notToPlay" onClick={() => addQueue(s._id)}>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        className={"notToPlay"}
                    >
                        <path
                            className={"notToPlay"}
                            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
                        />
                    </svg>
                </div>
                <div>
                    {(s.duration / 60 < 10 ? "0" : "") +
                        Math.floor(s.duration / 60)}{" "}
                    : {(s.duration % 60 < 10 ? "0" : "") + (s.duration % 60)}
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
                    onError={(e) =>
                        (e.target.src =
                            "https://f4.bcbits.com/img/a4139357031_10.jpg")
                    }
                />
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
