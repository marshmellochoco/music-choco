import { useState, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {} from "react-redux";
import AudioPlayerContainer from "./AudioPlayerContainer";
import MediaSession from "./MediaSession";
import { setPlaying, setPlayingTrack } from "../../store/player/playerAction";

const AudioPlayer = ({ openQueue, setOpenQueue, showPlayer }) => {
    const seekTime = 5;
    const ref = useRef();
    const dispatch = useDispatch();
    const { playingTrack, playing, loop } = useSelector(
        (state) => state.playerReducer
    );
    const queue = useSelector((state) => state.queueReducer);
    const [time, setTime] = useState(0);
    const [media, setMedia] = useState(playingTrack);

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

    useLayoutEffect(() => {
        if (playing) onPlay();
        else onPause();
        // eslint-disable-next-line
    }, [playing]);

    const onPreviousTrack = () => {
        if (!ref) return;
        const index = queue.indexOf(playingTrack) - 1;
        if (index >= 0) {
            dispatch(setPlayingTrack(queue[index]));
            dispatch(setPlaying(true));
        } else {
            ref.current.currentTime = 0;
            setTime(0);
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
                setTime(0);
            }
        } else {
            dispatch(setPlayingTrack(queue[index + 1]));
            onPlay();
        }
    };

    const seekByTime = (t) => {
        if (!ref) return;
        ref.current.currentTime = ref.current.currentTime + t;
    };

    const seekPercent = (progress) => {
        if (!ref) return;
        ref.current.currentTime =
            (Math.ceil(ref.current.duration) - 1) * progress;
    };

    useLayoutEffect(() => {
        setMedia({
            ...playingTrack,
        });
    }, [playingTrack]);

    return (
        <>
            {media.artists && (
                <MediaSession
                    title={media.name}
                    artist={media.artists.map((a) => a.name).join(", ")}
                    album={media.album.name}
                    artwork={[
                        {
                            src: media.album.image,
                        },
                    ]}
                    onPlay={onPlay}
                    onPause={onPause}
                    onNextTrack={onNextTrack}
                    onPreviousTrack={onPreviousTrack}
                    onSeekForward={() => seekByTime(seekTime)}
                    onSeekBackward={() => seekByTime(-seekTime)}
                />
            )}

            <AudioPlayerContainer
                openQueue={openQueue}
                setOpenQueue={setOpenQueue}
                time={time}
                forwardRef={ref}
                onPlay={onPlay}
                onPause={onPause}
                onPreviousTrack={onPreviousTrack}
                onNextTrack={onNextTrack}
                seekPercent={seekPercent}
                showPlayer={showPlayer}
            />
        </>
    );
};

export default AudioPlayer;
