import { AudioPlayerComponent } from "./AudioPlayerComponent";
import { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayingSong } from "../../store/actions/songDataAction";

export const AudioPlayerContainer = () => {
    // initialization
    const apiUrl = process.env.REACT_APP_API_URL;
    const songData = useSelector((state) => state.songDataReducer.songData);
    const queue = useSelector((state) => state.queueReducer.queue);
    const playing = useSelector((state) => state.playerReducer.playing);
    const volume = useSelector((state) => state.playerReducer.volume);
    const isLoop = useSelector((state) => state.playerReducer.loop);
    const isRandom = useSelector((state) => state.playerReducer.random);
    const [currentTime, setCurrentTime] = useState(0);
    const [lastVolume, setLastVolume] = useState(volume);
    const dispatch = useDispatch();
    const ref = createRef();

    // functions
    // player functions
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

    // control functions
    const setClickedTime = (percent) => {
        // seek to the partition of the song according the the percentage of timeline
        let second = (percent / 100) * songData.duration;
        ref.current.seekTo(second, "second");
    };

    const changeVolume = (vol) => {
        // change the volume, if it is unmuted, set volume to the previous volume
        setLastVolume(volume === 0 ? lastVolume : volume);
        dispatch({ type: "SET_VOLUME", volume: vol });
        console.log(vol);
    };

    const prevSong = () => {
        // play the previous song, if no previous song, restart the song
        // if is random, use the random queue list else use the normal queue list
        if (isRandom) {
            if (randomQueue.indexOf(songData.songId) === 0) {
                setClickedTime(0);
            } else {
                dispatch(
                    setPlayingSong(
                        randomQueue[randomQueue.indexOf(songData.songId) - 1]
                    )
                );
            }
        } else {
            if (queue.indexOf(songData.songId) === 0) {
                setClickedTime(0);
            } else {
                dispatch(
                    setPlayingSong(queue[queue.indexOf(songData.songId) - 1])
                );
            }
        }
    };

    const nextSong = () => {
        // play the next song, if is the last song in the list, play nothing
        // if is random, use the random queue list else use the normal queue list
        if (!songData.songId) return;

        const next = (q) => {
            if (q.indexOf(songData.songId) === q.length - 1) {
                dispatch(setPlayingSong(isLoop ? q[0] : ""));
            } else {
                dispatch(setPlayingSong(q[q.indexOf(songData.songId) + 1]));
            }
        };

        next(isRandom ? randomQueue : queue);
    };

    return (
        <AudioPlayerComponent
            songUrl={
                songData.songId ? `${apiUrl}/song/play/${songData.songId}` : ""
            }
            albumUrl={
                songData && songData.songId
                    ? `${apiUrl}/album/ico/${songData.albumId}`
                    : ""
            }
            playing={playing}
            volume={volume}
            lastVolume={lastVolume}
            songData={songData}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            onProgress={onProgress}
            onEnded={onEnded}
            nextSong={nextSong}
            prevSong={prevSong}
            changeVolume={changeVolume}
            setClickedTime={setClickedTime}
        />
    );
};
