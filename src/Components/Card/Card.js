import axios from "axios";
import { Link } from "react-router-dom";
import "./Card.css";

export const Card = ({
    id,
    name,
    artist,
    apiUrl,
    setQueue,
    setPlayingSong,
    setPlaying,
}) => {

    const handlePlayAlbum = async (e, id) => {
        e.preventDefault();

        var songListData = [];
        await axios
            .get(apiUrl + "/album/" + id)
            .then((res) => (songListData = res.data.songs));

        var songList = [];
        songListData.forEach((s) => {
            songList.push(s._id);
        });

        console.log(songList);
        setQueue(songList);
        setPlayingSong(songList[0]);
        setPlaying(true);
    };
    return (
        <Link className="cardItem" to={`/albums/${id}`}>
            <img src={apiUrl + "/album/" + id + "/ico"} alt="Album Icon"></img>
            <h1>{name}</h1>
            <div />
            <p>{artist}</p>
            <div
                className="playAlbum"
                onClick={(e) => {
                    handlePlayAlbum(e, id);
                }}
            >
                <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </Link>
    );
};
