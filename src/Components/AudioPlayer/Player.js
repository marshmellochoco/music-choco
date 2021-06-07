// dependancy import
import {
    mdiPauseCircleOutline,
    mdiPlayCircleOutline,
    mdiSkipNext,
    mdiSkipPrevious,
    mdiVolumeHigh,
    mdiVolumeMute,
} from "@mdi/js";
import Icon from "@mdi/react";
import { createRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

// component import
import { Slider } from "../Slider/Slider";
import "./Player.css";

export const Player = ({ randomQueue }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [currentTime, setCurrentTime] = useState(0);

    const songData = useSelector((state) => state.songDataReducer.songData);
    const queue = useSelector((state) => state.queueReducer.queue);
    const playing = useSelector((state) => state.playerReducer.playing);
    const volume = useSelector((state) => state.playerReducer.volume);
    const isLoop = useSelector((state) => state.playerReducer.loop);
    const isRandom = useSelector((state) => state.playerReducer.random);
    const dispatch = useDispatch();

    const [lastVolume, setLastVolume] = useState(volume);
    // --------- Audio Player Functions ----------
    const ref = createRef();

    const onProgress = (playedSeconds) => {
        // set the current time as the number of seconds played on the song
        if (Math.floor(playedSeconds) <= songData.duration) {
            setCurrentTime(Math.ceil(playedSeconds));
        }
    };

    const onEnded = () => {
        // play the next song when the current song has ended, reset the played time
        dispatch({ type: "SET_PLAYING", playing: false });
        setCurrentTime(0);
        nextSong();
        dispatch({ type: "SET_PLAYING", playing: true });
    };

    // --------- Audio Control Functions ----------
    const setClickedTime = (percent) => {
        // seek to the partition of the song according the the percentage of timeline
        let second = (percent / 100) * songData.duration;
        ref.current.seekTo(second, "second");
    };

    const changeVolume = (vol) => {
        // change the volume, if it is unmuted, set volume to the previous volume
        setLastVolume(volume === 0 ? lastVolume : volume);
        dispatch({ type: "SET_VOLUME", volume: vol });
    };

    const prevSong = () => {
        // play the previous song, if no previous song, restart the song
        // if is random, use the random queue list else use the normal queue list
        if (isRandom) {
            if (randomQueue.indexOf(songData.songId) === 0) {
                setClickedTime(0);
            } else {
                dispatch({
                    type: "SET_PLAYING_SONG",
                    songId: randomQueue[
                        randomQueue.indexOf(songData.songId) - 1
                    ],
                });
            }
        } else {
            if (queue.indexOf(songData.songId) === 0) {
                setClickedTime(0);
            } else {
                dispatch({
                    type: "SET_PLAYING_SONG",
                    songId: queue[queue.indexOf(songData.songId) - 1],
                });
            }
        }
    };

    const nextSong = () => {
        // play the next song, if is the last song in the list, play nothing
        // if is random, use the random queue list else use the normal queue list
        if (!songData.songId) return;

        const next = (q) => {
            if (q.indexOf(songData.songId) === q.length - 1) {
                dispatch({
                    type: "SET_PLAYING_SONG",
                    songId: isLoop ? q[0] : "",
                });
            } else {
                dispatch({
                    type: "SET_PLAYING_SONG",
                    songId: q[q.indexOf(songData.songId) + 1],
                });
            }
        };

        next(isRandom ? randomQueue : queue);
    };

    return (
        <div className="player" tabIndex="0">
            <div>
                <ReactPlayer
                    ref={ref}
                    width="0"
                    height="0"
                    loop={false}
                    url={
                        songData.songId
                            ? `${apiUrl}/song/play/${songData.songId}`
                            : ""
                    }
                    playing={playing}
                    volume={volume}
                    onStart={() => setCurrentTime(0)}
                    onProgress={(e) => onProgress(e.playedSeconds)}
                    onEnded={onEnded}
                />
                <div className="player-container">
                    <div className="player-playing">
                        <div className="icon">
                            <img
                                src={
                                    songData.albumId && songData.songId
                                        ? `${apiUrl}/album/ico/${songData.albumId}`
                                        : ""
                                }
                                alt=""
                                onError={(e) =>
                                    (e.target.src =
                                        "https://f4.bcbits.com/img/a4139357031_10.jpg")
                                }
                            />
                        </div>
                        <div className="title">
                            {songData.songId ? songData.title : "---"}
                        </div>
                        <div className="artist">
                            {songData.songId ? songData.artist : "---"}
                        </div>
                    </div>

                    <div className="player-control">
                        <Icon
                            path={mdiSkipPrevious}
                            className="buttonIcon control-button prev"
                            onClick={prevSong}
                        />
                        {playing ? (
                            <Icon
                                path={mdiPauseCircleOutline}
                                className="buttonIcon control-button play"
                                onClick={() =>
                                    dispatch({
                                        type: "SET_PLAYING",
                                        playing: false,
                                    })
                                }
                            />
                        ) : (
                            <Icon
                                path={mdiPlayCircleOutline}
                                className="buttonIcon control-button play"
                                onClick={() =>
                                    dispatch({
                                        type: "SET_PLAYING",
                                        playing: true,
                                    })
                                }
                            />
                        )}
                        <Icon
                            path={mdiSkipNext}
                            className="buttonIcon control-button next"
                            onClick={nextSong}
                        />
                    </div>

                    <div className="player-volume">
                        {volume === 0 ? (
                            <Icon
                                path={mdiVolumeMute}
                                className="buttonIcon volume-icon"
                                onClick={() => {
                                    changeVolume(
                                        lastVolume === 0 ? 100 : lastVolume
                                    );
                                }}
                            />
                        ) : (
                            <Icon
                                path={mdiVolumeHigh}
                                className="buttonIcon volume-icon"
                                onClick={() => {
                                    changeVolume(0);
                                }}
                            />
                        )}
                        <Slider
                            id="volumeSlider"
                            onChange={(value) => changeVolume(value / 100)}
                            transform={volume * 100 - 100}
                        />
                    </div>

                    <div className="player-timeline">
                        <div
                            className="player-time"
                            style={{ textAlign: "right" }}
                        >
                            {(currentTime / 60 < 10 ? "0" : "") +
                                Math.floor(currentTime / 60)}{" "}
                            :{" "}
                            {(currentTime % 60 < 10 ? "0" : "") +
                                (currentTime % 60)}
                        </div>

                        <Slider
                            id="timelineSlider"
                            onChange={setClickedTime}
                            transform={
                                (currentTime / songData.duration) * 100 - 100
                            }
                        />

                        <div
                            className="player-time"
                            style={{ textAlign: "left" }}
                        >
                            {(songData.duration / 60 < 10 ? "0" : "") +
                                Math.floor(songData.duration / 60)}{" "}
                            :{" "}
                            {(songData.duration % 60 < 10 ? "0" : "") +
                                (songData.duration % 60)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
