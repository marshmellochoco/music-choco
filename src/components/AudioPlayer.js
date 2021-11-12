import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setLoop,
    setPlaying,
    setPlayingTrack,
} from "../store/player/playerAction";
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

const AudioPlayer = ({ openQueue, setOpenQueue }) => {
    const ref = createRef();
    const dispatch = useDispatch();
    const [lapsed, setLapsed] = useState(0);
    const { playingTrack, playing, loop } = useSelector(
        (state) => state.playerReducer
    );
    const queue = useSelector((state) => state.queueReducer);

    useEffect(() => {
        if (playing) ref.current.play();
        else ref.current.pause();
    }, [playing, ref]);

    const toggleQueue = () => {
        setOpenQueue(!openQueue);
    };

    const playPause = () => {
        dispatch(setPlaying(!playing));
    };

    const updateDuration = (e) => {
        let duration = Math.ceil(ref.current.duration) - 1;
        if (duration - ref.current.currentTime <= 0.1) nextTrack();
        let progress = (ref.current.currentTime / duration) * 100;
        if (progress) setLapsed(progress);
    };

    const nextTrack = () => {
        const index = queue.indexOf(playingTrack) + 1;
        if (index >= queue.length) dispatch(setPlaying(false));
        else {
            dispatch(setPlayingTrack(queue[index]));
            dispatch(setPlaying(true));
        }
    };

    const prevTrack = () => {
        const index = queue.indexOf(playingTrack) - 1;
        if (index >= 0) {
            dispatch(setPlayingTrack(queue[index]));
            dispatch(setPlaying(true));
        } else {
            ref.current.currentTime = 0;
            setLapsed(0);
        }
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
                onTimeUpdate={updateDuration}
                onCanPlay={() => {
                    if (playing) ref.current.play();
                }}
            />
            <>
                <progress
                    max="100"
                    value={lapsed}
                    className="bottom-24 fixed w-full h-1 cursor-pointer bg-red-100"
                    // TODO: Show time on hovered point
                    // onMouseMove={(e) =>
                    //     console.log(
                    //         getFormattedDuration(
                    //             (e.clientX / e.view.innerWidth) *
                    //                 playingTrack.duration
                    //         )
                    //     )
                    // }
                    onClick={(e) =>
                        (ref.current.currentTime =
                            playingTrack.duration *
                            (e.pageX / e.target.scrollWidth))
                    }
                />
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
                            onClick={prevTrack}
                        />
                        {playing ? (
                            <Icon
                                path={mdiPauseCircleOutline}
                                title="Pause"
                                className="icon-medium hover:opacity-60 mx-2"
                                onClick={playPause}
                            />
                        ) : (
                            <Icon
                                path={mdiPlayCircleOutline}
                                title="Play"
                                className="icon-medium hover:opacity-60 mx-2"
                                onClick={playPause}
                            />
                        )}
                        <Icon
                            path={mdiSkipNext}
                            title="Next"
                            className="icon-small hover:opacity-60"
                            onClick={nextTrack}
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
                                onClick={toggleQueue}
                            />
                        ) : (
                            <Icon
                                path={mdiChevronUp}
                                title="Queue"
                                className={
                                    "icon-small hover:opacity-60 fill-current mx-2.5 text-pink-600"
                                }
                                onClick={toggleQueue}
                            />
                        )}
                    </div>
                </div>
            </>
        </>
    );
};

export default AudioPlayer;
