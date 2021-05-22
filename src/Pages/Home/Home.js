import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "../../Components/Card/Card";
import { Searchbar } from "../../Components/Searchbar/Searchbar";
import "./Home.css";

export const Home = ({ apiUrl, setQueue, setPlayingSong, setPlaying }) => {
    const [albums, setAlbums] = useState([]);
    const [search, setSearch] = useState("");

    // Run when page is loaded
    useEffect(() => {
        axios.get(apiUrl + "/album").then((res) => setAlbums(res.data));
    }, [apiUrl]);

    // Returns a list of card item containing album information
    const getAlbums = () => {
        return albums.map((album) => (
            <Card
                key={album.id}
                id={album.id}
                name={album.albumname}
                artist={album.artist}
                apiUrl={apiUrl}
                setQueue={setQueue}
                setPlayingSong={setPlayingSong}
                setPlaying={setPlaying}
            />
        ));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const searchResult = (query) => {
        return <p>{query}</p>
    }

    return (
        <div>
            <div className="headers">
                <h1>music-choco</h1>
                <Searchbar handleSearch={handleSearch} />
            </div>
            {search === "" ? (
                <div className="content">
                    <h1>Albums</h1>
                    <div className="cardList">
                        {albums.length === 0 ? (
                            <h2>There is no album</h2>
                        ) : (
                            getAlbums()
                        )}
                    </div>
                </div>
            ) : (
                <div>{searchResult(search)}</div>
            )}
        </div>
    );
};
