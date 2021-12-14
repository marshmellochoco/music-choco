import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
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

    const getAlbumSkeleton = (key) => {
        return (
            <div key={`album_skeleton_${key}`} className="card">
                <div className="card-link">
                    <Skeleton className="album-image" height={240} />
                    <Skeleton className="title2 mt-4" />
                </div>
                <div className="artistList">
                    <Skeleton className="linkItem" />
                </div>
            </div>
        );
    };

    const getArtistSkeleton = (key) => {
        return (
            <div key={`artist_skeleton_${key}`}  className="card  card-hover">
                <div>
                    <Skeleton className="album-image" height={240} />
                </div>
                <div className="m-2">
                    <Skeleton className="title2 mt-3 font-bold" />
                </div>
            </div>
        );
    };

    return (
        <div className="content page-content">
            <div>
                <h2  className="title">New Release</h2>
                <div className="card-list">
                    {newRelease.length === 0 &&
                        [1, 2, 3, 4, 5].map((_, i) => getAlbumSkeleton(i))}
                    {newRelease.reverse().map((a) => (
                        <AlbumCard album={a} key={a._id} />
                    ))}
                </div>
            </div>
            <div>
                <h2 className="title">Featured Artists</h2>
                <div className="card-list">
                    {featuredArtists.length === 0 &&
                        [1, 2, 3].map((_, i) => getArtistSkeleton(i))}
                    {featuredArtists.map((a) => (
                        <ArtistCard artist={a} key={a._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
