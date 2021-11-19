import { useEffect, useState } from "react";
import { getFeaturedArtist, getNewRelease } from "../api/trackApi";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";

const HomePage = () => {
    const [featuredArtists, setFeaturedArtists] = useState([]);
    const [newRelease, setNewRelease] = useState([]);
    useEffect(() => {
        getFeaturedArtist().then((result) => {
            setFeaturedArtists(result);
        });
        getNewRelease().then((result) => {
            setNewRelease(result);
        });
    }, []);

    return (
        <div className="content page-content">
            <div>
                <h2 className="title">New Release</h2>
                <div className="card-list">
                    {newRelease.reverse().map((a) => (
                        <AlbumCard album={a} key={a._id} />
                    ))}
                </div>
            </div>
            <div>
                <h2 className="title">Featured Artists</h2>
                <div className="card-list">
                    {featuredArtists.map((a) => (
                        <ArtistCard artist={a} key={a._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
