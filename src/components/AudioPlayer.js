import { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AudioPlayerComponent from "./AudioPlayerComponent";
import MediaSession from "./MediaSession";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";

const AudioPlayer = ({ openQueue, setOpenQueue, showPlayer }) => {
    const seekTime = 5;
    var ref = "";
    const dispatch = useDispatch();
    const { playingTrack, playing, loop } = useSelector(
        (state) => state.playerReducer
    );
    const queue = useSelector((state) => state.queueReducer);
    const [time, setTime] = useState(0);
    const [media, setMedia] = useState(playingTrack);

    const setRef = (input) => {
        ref = input;
    };

    const onPlay = () => {
        if (!ref.current) return;
        let playPromise = ref.current.play();
        playPromise.catch((err) => {});
        dispatch(setPlaying(true));
    };

    const onPause = () => {
        if (!ref.current) return;
        ref.current.pause();
        dispatch(setPlaying(false));
    };

    useLayoutEffect(() => {
        if (playing) onPlay();
        else onPause();
        // eslint-disable-next-line
    }, [playing]);

    const onPreviousTrack = () => {
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
        const index = queue.indexOf(playingTrack) + 1;
        if (index >= queue.length) {
            if (!loop) {
                onPause();
                ref.current.currentTime = 0;
                setTime(100);
            } else {
                dispatch(setPlayingTrack(queue[0]));
                onPlay();
            }
        } else {
            dispatch(setPlayingTrack(queue[index]));
            onPlay();
        }
    };

    const seekByTime = (t) => {
        if (!ref.current) return;
        ref.current.currentTime += t;
    };

    const seekPrecent = (progress) => {
        if (!ref.current) return;
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
                    title={media.title}
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

            <AudioPlayerComponent
                openQueue={openQueue}
                setOpenQueue={setOpenQueue}
                time={time}
                setRef={setRef}
                onPlay={onPlay}
                onPause={onPause}
                onPreviousTrack={onPreviousTrack}
                onNextTrack={onNextTrack}
                seekPrecent={seekPrecent}
                showPlayer={showPlayer}
            />
        </>
    );
};

export default AudioPlayer;
