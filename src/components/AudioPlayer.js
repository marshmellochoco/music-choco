import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AudioPlayerComponent from "./AudioPlayerComponent";
import MediaSession from "./MediaSession";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { useEffect } from "react";

const AudioPlayer = ({ openQueue, setOpenQueue }) => {
    const seekTime = 5;
    var ref = "";
    const dispatch = useDispatch();
    const { playingTrack, playing } = useSelector(
        (state) => state.playerReducer
    );
    const queue = useSelector((state) => state.queueReducer);
    const [time, setTime] = useState(0);
    const [media, setMedia] = useState(playingTrack);

    useEffect(() => {
        if (playing) ref.current.play();
        else ref.current.pause();
    }, [playing, ref]);

    const setRef = (input) => {
        ref = input;
    };

    const onPlay = () => {
        ref.current.play();
    };

    const onPause = () => {
        ref.current.pause();
    };

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
            dispatch(setPlaying(false));
            ref.current.currentTime = 0;
            setTime(100);
        } else {
            dispatch(setPlayingTrack(queue[index]));
            dispatch(setPlaying(true));
        }
    };

    const seekByTime = (t) => {
        ref.current.currentTime += t;
    };

    const seekPrecent = (progress) => {
        ref.current.currentTime =
            (Math.ceil(ref.current.duration) - 1) * progress;
    };

    useEffect(() => {
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
            />
        </>
    );
};

export default AudioPlayer;
