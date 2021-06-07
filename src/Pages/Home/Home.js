// dependancy import
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// component import
import { Card } from "../../Components/Card/Card";
import "./Home.css";

export const Home = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [search, setSearch] = useState("");
    const [albumSearch, setAlbumSearch] = useState([]);
    const [songSearch, setSongSearch] = useState([]);

    const playingSong = useSelector(
        (state) => state.songDataReducer.songData.songId
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (search) {
            axios
                .get(`${apiUrl}/album/search/${search}`)
                .then((result) => setAlbumSearch(result.data));

            axios
                .get(`${apiUrl}/song/search/${search}`)
                .then((result) => setSongSearch(result.data));
        }
    }, [search, apiUrl]);

    const playSong = (id) => {
        dispatch({ type: "ADD_QUEUE", songId: id });
        dispatch({ type: "SET_PLAYING_SONG", songId: id });
        dispatch({ type: "SET_PLAYING", playing: true });
    };

    const addSong = (id) => {
        // add the song to the queue
        dispatch({ type: "ADD_QUEUE", songId: id });
    };

    const handleImageError = (e) => {
        // return an alternate image if error
        e.target.src = "https://f4.bcbits.com/img/a4139357031_10.jpg";
    };

    const searchAlbum = () => {
        // return a list of card item of the album search result as component list
        return albumSearch.map((s) => {
            return (
                <Card
                    key={s._id}
                    id={s._id}
                    name={s.albumname}
                    artist={s.artist}
                    handleImageError={handleImageError}
                ></Card>
            );
        });
    };

    const searchSong = () => {
        // return a list of item of the song title search result as component list
        return songSearch.map((s) => {
            return (
                <li
                    key={s.songs._id}
                    onClick={(e) => playSong(s.songs._id)}
                    onContextMenu={(e) => addSong(s.songs._id)}
                    className={playingSong === s.songs._id ? "activeItem" : ""}
                >
                    <img
                        src={`${apiUrl}/album/ico/${s._id}`}
                        alt="album logo"
                        className="album"
                        onError={handleImageError}
                    />
                    <div className="songDetail">
                        <div className="songTitle">{s.songs.title}</div>
                        <div>{s.artist}</div>
                    </div>
                    <div>
                        {(s.songs.duration / 60 < 10 ? "0" : "") +
                            Math.floor(s.songs.duration / 60)}{" "}
                        :{" "}
                        {(s.songs.duration % 60 < 10 ? "0" : "") +
                            (s.songs.duration % 60)}
                    </div>
                </li>
            );
        });
    };

    return (
        <div>
            {search === "" ? (
                <div>Hello</div>
            ) : (
                <div className="content">
                    <h1>Albums</h1>
                    <div className="cardList">{searchAlbum()}</div>
                    <h1>Songs</h1>
                    <ul className="songList">{searchSong()}</ul>
                </div>
            )}
        </div>
    );
};
