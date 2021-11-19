import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getArtist, getArtistAlbums, getArtistTracks } from "../api/trackApi";
import AlbumCard from "../components/AlbumCard";
import { getTracksList } from "./common";

const ArtistPage = () => {
    const dispatch = useDispatch();
    const [artist, setArtist] = useState(undefined);
    const [albums, setAlbums] = useState(undefined);
    const [tracks, setTracks] = useState(undefined);
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const { id } = useParams();

    useEffect(() => {
        getArtist(id).then((result) => {
            setArtist(result);
        });
        getArtistTracks(id).then((result) => {
            setTracks(result);
        });
        getArtistAlbums(id).then(async (result) => {
            setAlbums(result.items);
        });
    }, [id]);

    const getAlbumsList = (albums) => {
        return albums.map((album) => {
            return <AlbumCard album={album} key={album._id} />;
        });
    };

    return (
        <div className="content page-content">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-8">
                    <img
                        src={artist && artist.image}
                        alt={artist && artist.name}
                        className="w-48 h-48 border border-red-200 rounded-full"
                    />
                    <h1 className="title">{artist && artist.name}</h1>
                </div>
                <div>
                    <h2 className="title2">Tracks</h2>
                    {tracks &&
                        getTracksList(dispatch, tracks, playingTrack, queue)}
                </div>
                <div>
                    <h2 className="title2">Albums</h2>
                    <div className="card-list">
                        {albums && getAlbumsList(albums)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistPage;
