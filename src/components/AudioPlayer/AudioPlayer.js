import { useState, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AudioPlayerContainer from "./AudioPlayerContainer";
import {
    setPlaying,
    setPlayingTrack,
    setVolume,
} from "../../store/player/playerAction";

const AudioPlayer = ({ openQueue, setOpenQueue, showPlayer }) => {
    const ref = useRef();
    const dispatch = useDispatch();
    const {
        playingTrack,
        playing: isPlaying,
        loop,
        volume,
    } = useSelector((state) => state.playerReducer);
    const queue = useSelector((state) => state.queueReducer);
    const [lapsed, setLapsed] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tempVolume, setTempVolume] = useState(0.5);

    useLayoutEffect(() => {
        if (!ref) return;
        ref.current.volume = volume;
        // eslint-disable-next-line
    }, [volume]);

    const onPlay = () => {
        if (!ref) return;
        let playPromise = ref.current.play();
        playPromise.catch((err) => {});
        dispatch(setPlaying(true));
    };

    const onPause = () => {
        if (!ref) return;
        ref.current.pause();
        dispatch(setPlaying(false));
    };

    const onPreviousTrack = () => {
        if (!ref) return;
        const index = queue.indexOf(playingTrack) - 1;
        if (index >= 0) {
            dispatch(setPlayingTrack(queue[index]));
            dispatch(setPlaying(true));
        } else {
            ref.current.currentTime = 0;
            setLapsed(0);
        }
    };

    const onNextTrack = () => {
        if (!ref) return;
        const index = queue.indexOf(playingTrack);
        if (index >= queue.length - 1) {
            if (loop) {
                dispatch(setPlayingTrack(queue[0]));
                onPlay();
            } else {
                onPause();
                ref.current.currentTime = 0;
                setLapsed(0);
            }
        } else {
            dispatch(setPlayingTrack(queue[index + 1]));
            onPlay();
        }
    };

    const onSeek = (progress) => {
        if (!ref) return;
        ref.current.currentTime =
            (Math.ceil(ref.current.duration) - 1) * progress;
    };

    const onTimeUpdate = (e) => {
        let duration = Math.ceil(ref.current.duration) - 1;
        if (duration - ref.current.currentTime <= 0.1) onNextTrack();
        let progress = (ref.current.currentTime / duration) * 100;
        setLapsed(progress);
    };

    const onCanPlay = () => {
        setIsLoading(false);
        if (isPlaying) onPlay();
        else onPause();
    };

    const onVolumeChange = (vol) => {
        dispatch(setVolume(vol));
    };

    const onMuteToggle = (mute) => {
        if (mute) {
            setTempVolume(volume);
            onVolumeChange(0);
        } else {
            onVolumeChange(tempVolume);
        }
    };

    return (
        <>
            <audio
                src={playingTrack ? playingTrack.play_url : ""}
                ref={ref}
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={onCanPlay}
                onTimeUpdate={onTimeUpdate}
            />
            <AudioPlayerContainer
                openQueue={openQueue}
                setOpenQueue={setOpenQueue}
                lapsed={lapsed}
                forwardRef={ref}
                onPlay={onPlay}
                onPause={onPause}
                onPreviousTrack={onPreviousTrack}
                onNextTrack={onNextTrack}
                onSeek={onSeek}
                showPlayer={showPlayer}
                isLoading={isLoading}
                isPlaying={isPlaying}
                onVolumeChange={onVolumeChange}
                playingTrack={playingTrack}
                onMuteToggle={onMuteToggle}
            />
        </>
    );
};

export default AudioPlayer;
