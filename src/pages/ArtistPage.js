import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MenuItem } from "react-contextmenu";
import Skeleton from "react-loading-skeleton";
import { getArtist, getArtistAlbums, getArtistTracks } from "../api/trackApi";
import AlbumCard from "../components/AlbumCard";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackItem from "../components/Tracks/TrackItem";
import { useDispatch, useSelector } from "react-redux";
import { addTrack, addTrackToPlaylist, playTrack } from "./common";

const ArtistPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const [artist, setArtist] = useState(undefined);
    const [albums, setAlbums] = useState(undefined);
    const [tracks, setTracks] = useState(undefined);
    const [loaded, setLoaded] = useState(false);

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

    const getAlbumSkeletion = (key) => {
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

    return (
        <div className="content page-content">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-8">
                    <img
                        src={artist && artist.image}
                        alt={artist && artist.name}
                        className={`w-48 h-48 border border-red-200 rounded-full ${
                            !loaded && "hidden"
                        }`}
                        onLoad={() => setLoaded(true)}
                    />
                    {!loaded && (
                        <Skeleton width={200} height={200} borderRadius={100} />
                    )}

                    <h1 className="title">{artist && artist.name}</h1>
                </div>
                <div>
                    <h2 className="title2">Tracks</h2>
                    {tracks === undefined &&
                        [1, 2, 3, 4, 5].map((_, i) => (
                            <TrackSkeleton key={i} id={i} />
                        ))}
                    {tracks &&
                        tracks.map((track, i) => {
                            return (
                                <TrackItem
                                    key={i}
                                    t={track}
                                    playingTrack={playingTrack}
                                    queue={queue}
                                >
                                    <MenuItem
                                        className="menuItem"
                                        onClick={() =>
                                            playTrack(
                                                dispatch,
                                                track._id,
                                                queue,
                                                playingTrack
                                            )
                                        }
                                    >
                                        Play
                                    </MenuItem>
                                    <MenuItem
                                        className="menuItem"
                                        onClick={() =>
                                            addTrack(dispatch, track._id, queue)
                                        }
                                    >
                                        Add to queue
                                    </MenuItem>
                                    <MenuItem
                                        className="menuItem"
                                        onClick={() =>
                                            addTrackToPlaylist(track._id)
                                        }
                                    >
                                        Add to playlist
                                    </MenuItem>
                                </TrackItem>
                            );
                        })}
                </div>
                <div>
                    <h2 className="title2">Albums</h2>
                    <div className="card-list">
                        {albums === undefined &&
                            [1, 2, 3].map((_, i) => getAlbumSkeletion(i))}
                        {albums && getAlbumsList(albums)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistPage;
