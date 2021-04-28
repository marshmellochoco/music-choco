import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/Card";
import "./Home.css";

export const Home = () => {
    const [albums, setAlbums] = useState([]);

    // Run when page is loaded
    useEffect(() => {
        axios
            .get("http://localhost:4000/album")
            .then((res) => setAlbums(res.data));
    }, []);

    // Returns a list of card item containing album information
    const getAlbums = () => {
        return albums.map((album) => (
            <Card
                key={album.id}
                id={album.id}
                name={album.albumname}
                artist={album.artist}
            />
        ));
    };

    return (
        <div>
            <h1>Albums</h1>
            <div className="cardList">
                {albums.length === 0 ? <h2>There is no album</h2> : getAlbums()}
            </div>
        </div>
    );
};