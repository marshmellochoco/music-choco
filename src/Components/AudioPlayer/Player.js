import axios from "axios";
import ReactPlayer from "react-player";

import { Slider } from "../Slider/Slider";
import { createRef, useState } from "react";

import "./Player.css";

export const Player = () => {
    // =============== State initialization ===============
    // --------- Audio Control States ----------
    var [playing, setPlaying] = useState(false);
    var [currentTime, setCurrentTime] = useState(0);
    var [volume, setVolume] = useState(1);
    var [lastVolume, setLastVolume] = useState(volume);

    // --------- Audio Player States ----------
    var [queue, setQueue] = useState([
        "60885e8e5bb4983d48b7ab5b",
        "60885ecd5bb4983d48b7ab63",
    ]);
    var [previous, setPrevious] = useState([]);

    // --------- Song Data Template ----------
    var [songData, setSongData] = useState({
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
        setCurrentTime(e.playedSeconds);
    };

    const onReady = async () => {
        await axios
            .get("http://localhost:4000/song/" + queue[0])
            .then((result) => {
                setSongData({
                    title: result.data.title,
                    artist: result.data.artist,
                    album: result.data.album,
                    duration: result.data.duration,
                    icon:
                        "http://localhost:4000/album/" +
                        result.data.album +
                        "/ico",
                });
            });
    };

    // --------- Audio Control Functions ----------
    const setClickedTime = (percent) => {
        let second = (percent / 100) * songData.duration;
        ref.current.seekTo(second, "second");
    };

    const changeVolume = (vol) => {
        setLastVolume(volume === 0 ? lastVolume : volume);
        setVolume(vol);
    };

    const prevSong = () => {
        if (previous.length < 1) {
            setClickedTime(0);
            return;
        }
        setQueue([previous[0], ...queue]);
        setPrevious(previous.slice(1, previous.length));
    };

    const nextSong = () => {
        if (queue.length <= 1) return;
        setPrevious([queue[0], ...previous]);
        setQueue(queue.slice(1, queue.length));
    };


    // --------- Return JSX ----------
    return (
        <div className="player" tabIndex="0">
            <div>
                <ReactPlayer
                    ref={ref}
                    width="0"
                    height="0"
                    url={`http://localhost:4000/song/play/${queue[0]}`}
                    playing={playing}
                    volume={volume}
                    onProgress={onProgress}
                    onReady={onReady}
                />
                <div className="player-container">
                    <div className="player-playing">
                        <div className="icon">
                            <img src={songData.icon} alt="" />
                        </div>
                        <div className="title">{songData.title}</div>
                        <div className="artist">{songData.artist}</div>
                    </div>

                    <div className="player-control">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="control-button"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={prevSong}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            />
                        </svg>
                        {playing ? (
                            <svg
                                onClick={() => setPlaying(false)}
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
                                onClick={() => setPlaying(true)}
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
                            xmlns="http://www.w3.org/2000/svg"
                            className="control-button"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={nextSong}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
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
                            onChange={(e) => setClickedTime(e.target.value)}
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
