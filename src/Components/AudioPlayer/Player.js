// dependancy import
import { createRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

// component import
import { Slider } from "../Slider/Slider";
import "./Player.css";

export const Player = ({ randomQueue }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [lastVolume, setLastVolume] = useState(volume);

    const songData = useSelector((state) => state.songDataReducer.songData);
    const queue = useSelector((state) => state.queueReducer.queue);
    const playing = useSelector((state) => state.playerReducer.playing);
    const isLoop = useSelector((state) => state.playerReducer.loop);
    const isRandom = useSelector((state) => state.playerReducer.random);
    const dispatch = useDispatch();

    // --------- Audio Player Functions ----------
    const ref = createRef();

    const onProgress = (e) => {
        // set the current time as the number of seconds played on the song
        if (Math.floor(e.playedSeconds) <= songData.duration) {
            setCurrentTime(Math.ceil(e.playedSeconds));
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
        setVolume(vol);
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
                    onProgress={onProgress}
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
                        <svg
                            className="control-button prev"
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
                                onClick={() =>
                                    dispatch({
                                        type: "SET_PLAYING",
                                        playing: false,
                                    })
                                }
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
                                onClick={() =>
                                    dispatch({
                                        type: "SET_PLAYING",
                                        playing: true,
                                    })
                                }
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
                            className="control-button next"
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
