import axios from "axios";
import ReactPlayer from "react-player";

import { Slider } from "../Slider/Slider";
import React, { createRef, useState } from "react";

import "./Player.css";

export const Player = ({
    playingSong,
    setPlayingSong,
    queue,
    playing,
    setPlaying,
    apiUrl,
    isRandom,
    isLoop,
    randomQueue,
}) => {
    // =============== State initialization ===============
    // --------- Audio Control States ----------
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [lastVolume, setLastVolume] = useState(volume);

    // --------- Song Data Template ----------
    const [songData, setSongData] = useState({
        title: "",
        artist: "",
        album: "",
        icon: "",
        duration: 0,
    });

    // =============== Functions Declaration ===============
    // --------- Audio Player Functions ----------
    const ref = createRef();

    const onProgress = (e) => {
        if (Math.floor(e.playedSeconds) <= songData.duration) {
            setCurrentTime(Math.floor(e.playedSeconds));
        }
    };

    const onEnded = () => {
        setPlaying(false);
        setCurrentTime(0);
        nextSong();
        setPlaying(true);
    };

    const onReady = async () => {
        if (queue.length > 0) {
            await axios.get(apiUrl + "/song/" + playingSong).then((result) => {
                setSongData({
                    title: result.data.songs.title,
                    artist: result.data.artist,
                    album: result.data.albumname,
                    duration: result.data.songs.duration - 2,
                    icon: apiUrl + "/album/" + result.data._id + "/ico",
                });
            });
        }
    };

    // --------- Audio Control Functions ----------
    const setClickedTime = (percent) => {
        let second = (percent / 100) * songData.duration;
        ref.current.seekTo(second, "second");
    };

    const changePlaying = (play) => {
        if (queue.length > 0) setPlaying(play);
    };

    const changeVolume = (vol) => {
        setLastVolume(volume === 0 ? lastVolume : volume);
        setVolume(vol);
    };

    const prevSong = () => {
        if (isRandom) {
            if (randomQueue.indexOf(playingSong) === 0) {
                setClickedTime(0);
            } else {
                setPlayingSong(
                    randomQueue[randomQueue.indexOf(playingSong) - 1]
                );
            }
        } else {
            if (queue.indexOf(playingSong) === 0) {
                setClickedTime(0);
            } else {
                setPlayingSong(queue[queue.indexOf(playingSong) - 1]);
            }
        }
    };

    const nextSong = () => {
        const next = (q) => {
            if (q.indexOf(playingSong) === q.length - 1)
                setPlayingSong(isLoop ? q[0] : "");
            else setPlayingSong(q[q.indexOf(playingSong) + 1]);
        };

        next(isRandom ? randomQueue : queue);
    };

    // --------- Return JSX ----------
    return (
        <div className="player" tabIndex="0">
            <div>
                <ReactPlayer
                    ref={ref}
                    width="0"
                    height="0"
                    loop={false}
                    url={
                        playingSong ? `${apiUrl}/song/play/${playingSong}` : ""
                    }
                    playing={playing}
                    volume={volume}
                    onProgress={onProgress}
                    onReady={onReady}
                    onEnded={onEnded}
                />
                <div className="player-container">
                    <div className="player-playing">
                        <div className="icon">
                            <img
                                src={playingSong ? songData.icon : ""}
                                alt=""
                                onError={(e) =>
                                    (e.target.src =
                                        "https://f4.bcbits.com/img/a4139357031_10.jpg")
                                }
                            />
                        </div>
                        <div className="title">
                            {playingSong ? songData.title : "---"}
                        </div>
                        <div className="artist">
                            {playingSong ? songData.artist : "---"}
                        </div>
                    </div>

                    <div className="player-control">
                        <svg
                            className="control-button"
                            viewBox="0 0 24 24"
                            onClick={prevSong}
                        >
                            <path
                                fill="currentColor"
                                d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z"
                            />
                        </svg>
                        {playing ? (
                            <svg
                                onClick={() => changePlaying(false)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="control-button play"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        ) : (
                            <svg
                                onClick={() => changePlaying(true)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="control-button play"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        )}
                        <svg
                            className="control-button"
                            viewBox="0 0 24 24"
                            onClick={nextSong}
                        >
                            <path
                                fill="currentColor"
                                d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z"
                            />
                        </svg>
                    </div>

                    <div className="player-volume">
                        {volume === 0 ? (
                            <svg
                                className="volume-icon"
                                onClick={() => {
                                    changeVolume(lastVolume);
                                }}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="volume-icon"
                                onClick={() => {
                                    changeVolume(0);
                                }}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                        <Slider
                            onChange={(e) => changeVolume(e.target.value / 100)}
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
                                Math.floor(currentTime % 60)}
                        </div>

                        <Slider
                            onChange={(e) => {
                                setClickedTime(e.target.value);
                                e.target.value = 100;
                            }}
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
                                Math.floor(songData.duration % 60)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
