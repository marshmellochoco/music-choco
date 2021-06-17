// dependancy import
import { mdiPlayCircle } from "@mdi/js";
import Icon from "@mdi/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setQueue } from "../../store/actions/queueAction";
import { setPlayingSong } from "../../store/actions/songDataAction";

// component import
import "./Card.css";

export const Card = ({ id, name, artist, handleImageError }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();

    const handlePlayAlbum = async (id) => {
        // play the entire album associated with the card, replace the existing queue with the album list
        var songListData = [];
        await axios
            .get(`${apiUrl}/album/${id}`)
            .then((res) => (songListData = res.data.songs))
            .catch((e) => (songListData = []));

        var songList = [];
        songListData.forEach((s) => {
            songList.push(s._id);
        });

        dispatch(setPlayingSong(songList[0]));
        dispatch({ type: "SET_PLAYING", playing: true });
        dispatch(setQueue(songList));
    };

    return (
        <Link className="cardItem" to={`/albums/${id}`}>
            <img
                src={`${apiUrl}/album/ico/${id}`}
                alt="Album Icon"
                onError={handleImageError}
            />
            <h1>{name}</h1>
            <div />
            <p>{artist}</p>

            <Icon
                path={mdiPlayCircle}
                className="buttonIcon playAlbum"
                onClick={(e) => {
                    e.preventDefault();
                    handlePlayAlbum(id);
                }}
            />
        </Link>
    );
};
