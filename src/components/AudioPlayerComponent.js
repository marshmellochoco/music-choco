import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoop } from "../store/player/playerAction";
import { setQueue } from "../store/queue/queueAction";
import {
    mdiChevronDown,
    mdiChevronUp,
    mdiPauseCircleOutline,
    mdiPlayCircleOutline,
    mdiShuffle,
    mdiSkipNext,
    mdiSkipPrevious,
    mdiSync,
    mdiVolumeHigh,
} from "@mdi/js";
import Icon from "@mdi/react";

const AudioPlayer = ({
    openQueue,
    setOpenQueue,
    setRef,
    time,
    onPlay,
    onPause,
    onNextTrack,
    onPreviousTrack,
    seekPrecent,
}) => {
    const ref = createRef();
    const dispatch = useDispatch();
    const { playingTrack, loop } = useSelector((state) => state.playerReducer);
    const [lapsed, setLapsed] = useState(0);
    const queue = useSelector((state) => state.queueReducer);
    const [play, setPlay] = useState(true);
    setRef(ref);

    useEffect(() => {
        setLapsed(time);
    }, [time]);

    useEffect(() => {
        ref.current.pause();
        ref.current.currentTime = 0;
        setLapsed(0);
        ref.current.play();
    }, [playingTrack]);

    const onTimeUpdate = (e) => {
        let duration = Math.ceil(ref.current.duration) - 1;
        if (duration - ref.current.currentTime <= 0.1) onNextTrack();
        let progress = (ref.current.currentTime / duration) * 100;
        if (progress) setLapsed(progress);
    };

    const shuffle = () => {
        let q = [...queue];
        q.splice(q.indexOf(playingTrack), 1);
        let shuffled = [...q].sort(() => Math.random() - 0.5);
        dispatch(setQueue([playingTrack, ...shuffled]));
    };

    return (
        <>
            <audio
                src={playingTrack.url}
                ref={ref}
                onTimeUpdate={onTimeUpdate}
                onPlay={() => setPlay(true)}
                onPause={() => setPlay(false)}
            />
            <>
                <div
                    className="bottom-24 fixed w-full h-2 z-10 bg-red-50 opacity-60 h:opacity-1 draggable-container cursor-pointer"
                    onClick={(e) => seekPrecent(e.pageX / e.view.innerWidth)}
                >
                    <div
                        className="bottom-24 fixed w-full h-2 z-10 progress"
                        style={{ transform: `translateX(${lapsed - 100}%)` }}
                    >
                        <div
                            className="h-3 w-3 bg-red-400 rounded-full ml-auto -mr-1.5 -mt-0.5"
                            draggable
                            onDragEnd={(e) =>
                                seekPrecent(e.pageX / e.view.innerWidth)
                            }
                        />
                    </div>
                </div>
                <div className="bottom-0 fixed w-full h-24 grid grid-cols-3 bg-red-50">
                    <div className="flex items-center h-24">
                        <img
                            src={playingTrack.album.image}
                            alt={`${playingTrack.title} - ${playingTrack.album.name}`}
                            className="w-20 h-20 mb-2 ml-1 hidden md:block "
                        />
                        <div className="ml-2">
                            <b className="hover:underline">
                                {playingTrack.title}
                            </b>
                            <p className="hover:underline">
                                {playingTrack.album.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Icon
                            path={mdiSkipPrevious}
                            title="Previous"
                            className="icon-small hover:opacity-60"
                            onClick={onPreviousTrack}
                        />
                        {play ? (
                            <Icon
                                path={mdiPauseCircleOutline}
                                title="Pause"
                                className="icon-medium hover:opacity-60 mx-2"
                                onClick={onPause}
                            />
                        ) : (
                            <Icon
                                path={mdiPlayCircleOutline}
                                title="Play"
                                className="icon-medium hover:opacity-60 mx-2"
                                onClick={onPlay}
                            />
                        )}
                        <Icon
                            path={mdiSkipNext}
                            title="Next"
                            className="icon-small hover:opacity-60"
                            onClick={onNextTrack}
                        />
                    </div>
                    <div className="flex justify-end items-center mr-2">
                        <Icon
                            path={mdiVolumeHigh}
                            title="Volume"
                            className={
                                "icon-small hover:opacity-60 fill-current text-pink-300 mx-2.5"
                            }
                        />
                        <Icon
                            path={mdiSync}
                            title="Loop"
                            className={`icon-small hover:opacity-60 fill-current mx-2.5 ${
                                loop ? "text-pink-600" : "text-pink-300"
                            }`}
                            onClick={() => dispatch(setLoop(!loop))}
                        />
                        <Icon
                            path={mdiShuffle}
                            title="Shuffle"
                            className={
                                "icon-small hover:opacity-60 fill-current mx-2.5 text-pink-300"
                            }
                            onClick={shuffle}
                        />

                        {openQueue ? (
                            <Icon
                                path={mdiChevronDown}
                                title="Queue"
                                className={
                                    "icon-small hover:opacity-60 fill-current mx-2.5 text-pink-600"
                                }
                                onClick={() => setOpenQueue(false)}
                            />
                        ) : (
                            <Icon
                                path={mdiChevronUp}
                                title="Queue"
                                className={
                                    "icon-small hover:opacity-60 fill-current mx-2.5 text-pink-600"
                                }
                                onClick={() => setOpenQueue(true)}
                            />
                        )}
                    </div>
                </div>
            </>
        </>
    );
};

export default AudioPlayer;
