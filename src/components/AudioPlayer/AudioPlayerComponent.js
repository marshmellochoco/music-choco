import { createRef, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setVolume } from "../../store/player/playerAction";

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
    const dispatch = useDispatch();
    const { playingTrack, volume } = useSelector(
        (state) => state.playerReducer
    );
    const [lapsed, setLapsed] = useState(0);
    const [play, setPlay] = useState(true);
    const [openVol, setOpenVol] = useState(false);
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
                                className="text-pink-900 hover:text-red-500"
                            >
                                <b>{playingTrack.title}</b>
                            </Link>
                            <div className="artistList">
                                {playingTrack.artists &&
                                    playingTrack.artists.map((artist) => (
                                        <Link
                                            to={`/artist/${artist._id}`}
                                            key={artist._id}
                                            className="hover:underline linkItem text-pink-900"
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="rounded-full hover:bg-red-200">
                            <Icon
                                path={mdiSkipPrevious}
                                title="Previous"
                                className="icon-small text-pink-600"
                                onClick={onPreviousTrack}
                            />
                        </div>
                        {play ? (
                            <div className="rounded-full hover:bg-red-200">
                                <Icon
                                    path={mdiPauseCircleOutline}
                                    title="Pause"
                                    className="icon-medium text-pink-600"
                                    onClick={onPause}
                                />
                            </div>
                        ) : (
                            <div className="rounded-full hover:bg-red-200">
                                <Icon
                                    path={mdiPlayCircleOutline}
                                    title="Play"
                                    className="icon-medium text-pink-600"
                                    onClick={onPlay}
                                />
                            </div>
                        )}
                        <div className="rounded-full hover:bg-red-200">
                            <Icon
                                path={mdiSkipNext}
                                title="Next"
                                className="icon-small text-pink-600"
                                onClick={onNextTrack}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end items-center mr-2 gap-2">
                        <div
                            className={`rounded-full hover:bg-red-200 flex items-center cursor-pointer justify-end w-40 ${
                                openVol && "pl-2 pr-4"
                            }`}
                            onMouseEnter={() => setOpenVol(true)}
                            onMouseLeave={() => setOpenVol(false)}
                        >
                            <Icon
                                path={mdiVolumeHigh}
                                title="Volume"
                                className="icon-small fill-current text-pink-600"
                            />
                            <input
                                type="range"
                                className={`w-full ${!openVol && "hidden"}`}
                                defaultValue={volume * 100}
                                onChange={(e) => setVol(e.target.value / 100)}
                            />
                        </div>
                        <div className="rounded-full hover:bg-red-200">
                            {openQueue ? (
                                <Icon
                                    path={mdiChevronDown}
                                    title="Queue"
                                    className={
                                        "icon-small fill-current mx-2.5 text-pink-600"
                                    }
                                    onClick={() => setOpenQueue(false)}
                                />
                            ) : (
                                <Icon
                                    path={mdiChevronUp}
                                    title="Queue"
                                    className={
                                        "icon-small fill-current mx-2.5 text-pink-600"
                                    }
                                    onClick={() => setOpenQueue(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AudioPlayer;
