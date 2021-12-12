import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAlbum, getAlbumTracks } from "../api/trackApi";
import { Link } from "react-router-dom";
import { getTracksList, playTrack } from "./common";

const AlbumPage = () => {
    const dispatch = useDispatch();
    const [album, setAlbum] = useState(undefined);
    const [tracks, setTracks] = useState(undefined);
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const { id } = useParams();

    useEffect(() => {
        getAlbum(id).then((result) => {
            setAlbum(result);
        });
        getAlbumTracks(id).then((result) => {
            setTracks(result.tracks);
        });
    }, [id]);

    const playAlbum = () => {
        tracks.forEach(track => {
            playTrack(dispatch, track._id, queue);
        });
    };

    const addAlbum = () => {
        // TODO: Implement library
    };

    return (
        <div className="content page-content">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 sm:gap-8 flex-col sm:flex-row">
                    <img
                        src={album && album.image}
                        alt={album && album.name}
                        className="w-full h-full sm:w-48 sm:h-48 border border-white"
                    />
                    <div className="w-full sm:w-full flex flex-col gap-4">
                        <div>
                            <h1 className="title">{album && album.name}</h1>
                            <div>
                                {album &&
                                    album.artists.map((artist) => (
                                        <Link
                                            to={`/artist/${artist._id}`}
                                            className="title2 font-normal hover:underline linkItem"
                                            key={artist._id}
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                            </div>
                            <p className="w-full mt-2">
                                Tracks: {tracks && tracks.length}
                            </p>
                        </div>
                        <div className="flex justify-start gap-2">
                            <button
                                className="btn btn-sm btn-sm w-1/2 btn-confirm md:w-48"
                                onClick={playAlbum}
                            >
                                Play
                            </button>
                            <button className="btn btn-sm w-1/2 md:w-48" onClick={addAlbum}>
                                Add to Library
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="title2">Tracks</h2>
                    {album &&
                        tracks &&
                        getTracksList(dispatch, tracks, playingTrack, queue)}
                </div>
            </div>
        </div>
    );
};

export default AlbumPage;
