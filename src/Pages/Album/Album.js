// dependancy import
import { mdiPlusBox } from "@mdi/js";
import Icon from "@mdi/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// component import
import "./Album.css";

export const Album = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
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
            .then((res) => setSongs(res.data.songs))
            .catch((e) => console.log(e));
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
                    // TODO: Bug: Click add queue but play instead
                    e.target.getAttribute("class") !== "notToPlay"
                        ? setSong(s._id)
                        : null
                }
                onContextMenu={(e) => addQueue(s._id)}
            >
                <div>{i + 1}</div>
                <div>{s.title}</div>
                <div className="icon notToPlay" onClick={() => addQueue(s._id)}>
                    <Icon
                        path={mdiPlusBox}
                        className="notToPlay buttonIcon"
                        onClick={() => console.log("click")}
                    />
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
                    src={`${apiUrl}/album/ico/${id}`}
                    onClick={() => setAlbumToQueue()}
                    onError={(e) =>
                        (e.target.src =
                            "https://f4.bcbits.com/img/a4139357031_10.jpg")
                    }
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
                    <div />
                    <div>Duration</div>
                </li>
                <hr />
                {getSongs()}
            </ul>
        </div>
    );
};
