import { createRef, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    mdiChevronDown,
    mdiChevronUp,
    mdiPauseCircleOutline,
    mdiPlayCircleOutline,
    mdiSkipNext,
    mdiSkipPrevious,
    mdiVolumeHigh,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
    showPlayer,
}) => {
    const ref = createRef();
    const { playingTrack } = useSelector((state) => state.playerReducer);
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

    const onTimeUpdate = (e) => {
        let duration = Math.ceil(ref.current.duration) - 1;
        if (duration - ref.current.currentTime <= 0.1) onNextTrack();
        let progress = (ref.current.currentTime / duration) * 100;
        setLapsed(progress);
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
            <div className={`${showPlayer && "hidden"}`}>
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
                    <div className="grid gap-2 songPlayerGrid items-center h-24">
                        <Link
                            to={`/album/${playingTrack.album._id}`}
                            className="w-20 h-20 mb-2 ml-1 hidden md:block"
                        >
                            <img
                                src={playingTrack.album.image}
                                alt={`${playingTrack.title} - ${playingTrack.album.name}`}
                                className="w-20 h-20"
                            />
                        </Link>
                        <div className="ml-2 playerArtistList overflow-hidden whitespace-nowrap overflow-ellipsis">
                            <Link
                                to={`/album/${playingTrack.album._id}`}
                                className="hover:text-red-500"
                            >
                                <b>
                                    {playingTrack.title}
                                </b>
                            </Link>
                            <div className="artistList">
                                {playingTrack.artists &&
                                    playingTrack.artists.map((artist) => (
                                        <Link
                                            to={`/artist/${artist._id}`}
                                            key={artist._id}
                                            className="hover:underline linkItem "
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                            </div>
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
            </div>
        </>
    );
};

export default AudioPlayer;
