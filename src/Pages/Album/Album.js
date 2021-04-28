import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Album.css";

export const Album = () => {
    const [songs, setSongs] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:4000/album/" + id)
            .then((res) => setSongs(res.data.songs));
    }, [id]);

    const getSongs = () => {
        return songs.map((s, i) => (
            <li className="songItem" key={s._id}>
                <div>
                    <svg
                        className="w-6 h-6"
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
                <div>{i + 1}</div>
                <div>{s.title}</div>
                <div>3:15</div>
            </li>
        ));
    };

    return (
        <div>
            <h1>Albums</h1>
            <ul className="songList">
                <li className="activeItem">
                    <div></div>
                    <div>#</div>
                    <div>Title</div>
                    <div>Duration</div>
                </li>
                {getSongs()}
            </ul>
        </div>
    );
};

//TODO: Able to click on album or song to play the album or song