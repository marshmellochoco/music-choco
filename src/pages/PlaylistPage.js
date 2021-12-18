import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem, SubMenu } from "react-contextmenu";
import { mdiMusic } from "@mdi/js";
import Icon from "@mdi/react";
import { getPlaylist } from "../api/userApi";
import TrackSkeleton from "../components/Tracks/TrackSkeleton";
import TrackItem from "../components/Tracks/TrackItem";
import { useDispatch, useSelector } from "react-redux";
import { addTrack, addTrackToPlaylist, playTrack } from "./common";

const PlaylistPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { playingTrack } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        getPlaylist(id).then((response) => {
            setPlaylist(response);
        });
    }, [id]);

    return (
        <div className="content page-content">
            {playlist !== null && (
                <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="w-full">
                        <div className="border border-red-200 m-2">
                            {playlist.image === "" ? (
                                <Icon
                                    path={mdiMusic}
                                    className="bg-pink-200 text-white"
                                />
                            ) : (
                                <img
                                    src={playlist.image}
                                    alt="Playlist Thumbnail"
                                />
                            )}
                        </div>
                        <h1 className="title">{playlist.name}</h1>
                        <div>
                            <p>{playlist.creator}</p>
                            <p>Created At: {playlist.createdAt}</p>
                            <p>Last Update: {playlist.updatedAt}</p>
                        </div>
                        <button className="btn btn-sm btn-confirm w-full mt-2">
                            Play
                        </button>
                    </div>
                    <div className="sm:col-span-2 md:col-span-3">
                        <h2 className="title2">Tracks</h2>
                        {playlist.tracks === undefined &&
                            [1, 2, 3, 4, 5].map((_, i) => (
                                <TrackSkeleton key={i} id={i} />
                            ))}
                        {playlist.tracks &&
                            playlist.tracks.map((track, i) => {
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
                                                addTrack(
                                                    dispatch,
                                                    track._id,
                                                    queue
                                                )
                                            }
                                        >
                                            Add to queue
                                        </MenuItem>
                                        <SubMenu
                                            className="menuItem"
                                            title="Add to playlist"
                                        >
                                            <MenuItem
                                                className="menuItem"
                                                onClick={() =>
                                                    addTrackToPlaylist(
                                                        track._id
                                                    )
                                                }
                                            >
                                                Playlist 1
                                            </MenuItem>
                                        </SubMenu>
                                    </TrackItem>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlaylistPage;
