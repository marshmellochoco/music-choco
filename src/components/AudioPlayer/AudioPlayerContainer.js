import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "../../store/player/playerAction";
import AudioPlayerProgress from "./AudioPlayerProgress";
import AudioPlayerTrack from "./AudioPlayerTrack";
import AudioPlayerControl from "./AudioPlayerControl";
import AudioPlayerSub from "./AudioPlayerSub";

const AudioPlayerContainer = ({
    openQueue,
    setOpenQueue,
    forwardRef: ref,
    time,
    onPlay,
    onPause,
    onNextTrack,
    onPreviousTrack,
    seekPercent,
    showPlayer,
}) => {
    const dispatch = useDispatch();
    const { playingTrack, volume } = useSelector(
        (state) => state.playerReducer
    );
    const [lapsed, setLapsed] = useState(0);
    const [play, setPlay] = useState(true);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        setLapsed(time);
    }, [time]);

    useLayoutEffect(() => {
        if (!ref) return;
        ref.current.currentTime = 0;
        setLapsed(0);
        // eslint-disable-next-line
    }, [playingTrack]);

    useEffect(() => {
        if (!ref) return;
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
                src={playingTrack ? playingTrack.play_url : ""}
                ref={ref}
                onLoadStart={() => setLoading(true)}
                onCanPlay={() => {
                    if (play) {
                        setLoading(false);
                        onPlay();
                    }
                }}
                onTimeUpdate={onTimeUpdate}
                onPlay={() => setPlay(true)}
                onPause={() => setPlay(false)}
            />
            {showPlayer && (
                <>
                    <div className="audio-player-placeholder"></div>
                    <div>
                        <AudioPlayerProgress
                            seekPercent={seekPercent}
                            lapsed={lapsed}
                        />
                        <div className="audio-player">
                            <AudioPlayerTrack
                                playingTrack={playingTrack}
                                loading={loading}
                            />
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
            )}
        </>
    );
};

export default AudioPlayerContainer;
