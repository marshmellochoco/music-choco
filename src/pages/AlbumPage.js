import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAlbum, getAlbumTracks } from "../api/trackApi";
import { Link } from "react-router-dom";
import { getTracksList } from "./common";

const AlbumPage = () => {
    const dispatch = useDispatch();
    const [album, setAlbum] = useState(undefined);
    const [tracks, setTracks] = useState(undefined);
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const { id } = useParams();

    useEffect(() => {
        getAlbum(id).then((result) => {
            setAlbum(result);
        });
        getAlbumTracks(id).then((result) => {
            setTracks(result.tracks);
        });
    }, [id]);

    // TODO: Implement add and play album
    const playAlbum = () => {};

    const addAlbum = () => {};

    return (
        <div className="content flex flex-col gap-4">
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
                            <p>
                                {album &&
                                    album.artists.map((artist) => (
                                        <Link
                                            to={`/artist/${artist._id}`}
                                            className="title2 font-normal hover:underline "
                                            key={artist._id}
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                            </p>
                            <p className="w-96 sm:w-full mt-2">
                                Tracks: {tracks && tracks.length}
                            </p>
                        </div>
                        <div className="flex justify-start gap-2">
                            <button
                                className="btn w-1/2 btn-confirm"
                                onClick={playAlbum}
                            >
                                Play
                            </button>
                            <button className="btn w-1/2" onClick={addAlbum}>
                                Add to Library
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="title2">Tracks</h2>
                    {album &&
                        tracks &&
                        getTracksList(dispatch, tracks, playingTrack)}
                </div>
            </div>
        </div>
    );
};

export default AlbumPage;
