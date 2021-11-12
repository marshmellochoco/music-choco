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
        <div className="flex flex-col gap-4 content">
            <div>
                <h1 className="title">New Release</h1>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {newRelease.reverse().map((a) => (
                        <AlbumCard album={a} key={a._id} />
                    ))}
                </div>
            </div>
            <div>
                <h1 className="title">Featured Artists</h1>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {featuredArtists.map((a) => (
                        <ArtistCard artist={a} key={a._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
