import { createRef, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "../../store/player/playerAction";
import AudioPlayerProgress from "./AudioPlayerProgress";
import AudioPlayerTrack from "./AudioPlayerTrack";
import AudioPlayerControl from "./AudioPlayerControl";
import AudioPlayerSub from "./AudioPlayerSub";

const AudioPlayerContainer = ({
    openQueue,
    setOpenQueue,
    setRef,
    time,
    onPlay,
    onPause,
    onNextTrack,
    onPreviousTrack,
    seekPercent,
    showPlayer,
}) => {
    const ref = createRef();
    const dispatch = useDispatch();
    const { playingTrack, volume } = useSelector(
        (state) => state.playerReducer
    );
    const [lapsed, setLapsed] = useState(0);
    const [play, setPlay] = useState(true);
    setRef(ref);

    useLayoutEffect(() => {
        setLapsed(time);
    }, [time]);

    useLayoutEffect(() => {
        ref.current.currentTime = 0;
        setLapsed(0);
        // eslint-disable-next-line
    }, [playingTrack]);

    useEffect(() => {
        ref.current.volume = volume;
        // eslint-disable-next-line
    }, [volume]);

    const onTimeUpdate = (e) => {
        let duration = Math.ceil(ref.current.duration) - 1;
        if (duration - ref.current.currentTime <= 0.1) onNextTrack();
        let progress = (ref.current.currentTime / duration) * 100;
        setLapsed(progress);
    };

    const setVol = (vol) => {
        dispatch(setVolume(vol));
    };

    return (
        <>
            <audio
                src={playingTrack.url}
                ref={ref}
                onCanPlay={() => play && onPlay()}
                onTimeUpdate={onTimeUpdate}
                onPlay={() => setPlay(true)}
                onPause={() => setPlay(false)}
            />
            <div className={`${showPlayer && "hidden"}`}>
                <AudioPlayerProgress
                    seekPercent={seekPercent}
                    lapsed={lapsed}
                />
                <div className="bottom-0 fixed w-full h-24 grid grid-cols-3 bg-red-50">
                    <AudioPlayerTrack playingTrack={playingTrack} />
                    <AudioPlayerControl
                        isPlaying={play}
                        pause={onPause}
                        play={onPlay}
                        previousTrack={onPreviousTrack}
                        nextTrack={onNextTrack}
                    />
                    <AudioPlayerSub
                        openQueue={openQueue}
                        setOpenQueue={setOpenQueue}
                        volume={volume}
                        setVolume={setVol}
                    />
                </div>
            </div>
        </>
    );
};

export default AudioPlayerContainer;
