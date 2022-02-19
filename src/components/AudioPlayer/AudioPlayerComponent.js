import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    mdiPauseCircleOutline,
    mdiPlayCircleOutline,
    mdiSkipNext,
    mdiSkipPrevious,
    mdiChevronDown,
    mdiChevronUp,
    mdiVolumeHigh,
    mdiVolumeOff,
} from "@mdi/js";
import Icon from "@mdi/react";
import ArtistList from "../ArtistList";

const AudioPlayerComponent = ({
    openQueue,
    setOpenQueue,
    lapsed,
    onPlay,
    onPause,
    onNextTrack,
    onPreviousTrack,
    onSeek,
    showPlayer,
    isLoading,
    isPlaying,
    onVolumeChange,
    playingTrack,
    onMuteToggle,
}) => {
    const { volume } = useSelector((state) => state.playerReducer);
    // TODO: Mute
    const [mute, setMute] = useState(false);
    const [openVolume, setOpenVolume] = useState(false);

    const onMute = () => {
        onMuteToggle(!mute);
        setMute(!mute);
    };

    return (
        showPlayer && (
            <>
                <div className="audio-player-placeholder"></div>
                <div>
                    <div
                        className="player-progress"
                        onClick={(e) => onSeek(e.pageX / e.view.innerWidth)}
                    >
                        <div
                            className="progress-track"
                            style={{
                                transform: `translateX(${lapsed - 100}%)`,
                            }}
                        >
                            <div
                                className="progress-thumb"
                                draggable
                                onDragEnd={(e) =>
                                    onSeek(e.pageX / e.view.innerWidth)
                                }
                            />
                        </div>
                    </div>

                    <div className="audio-player">
                        <div className="player-track">
                            <div className="track-image">
                                {isLoading && (
                                    <div className="image-loader">
                                        <div className="loader-wrapper">
                                            <div className="loader" />
                                        </div>
                                    </div>
                                )}
                                <Link
                                    to={`/album/${playingTrack.album.id}`}
                                    className="track-image"
                                    title={playingTrack.album.name}
                                >
                                    <img
                                        src={playingTrack.album.image}
                                        alt={playingTrack.album.name}
                                    />
                                </Link>
                            </div>
                            <div className="track-detail">
                                <Link
                                    to={`/album/${playingTrack.album.id}`}
                                    className="track-name"
                                    title={playingTrack.name}
                                >
                                    <b>{playingTrack.name}</b>
                                </Link>
                                <ArtistList artists={playingTrack.artists} />
                            </div>
                        </div>

                        <div className="player-control">
                            <div onClick={onPreviousTrack}>
                                <Icon
                                    path={mdiSkipPrevious}
                                    title="Previous"
                                    className="icon-small"
                                />
                            </div>
                            {isPlaying ? (
                                <div onClick={onPause}>
                                    <Icon
                                        path={mdiPauseCircleOutline}
                                        title="Pause"
                                        className="icon-medium"
                                    />
                                </div>
                            ) : (
                                <div onClick={onPlay}>
                                    <Icon
                                        path={mdiPlayCircleOutline}
                                        title="Play"
                                        className="icon-medium"
                                    />
                                </div>
                            )}
                            <div onClick={onNextTrack}>
                                <Icon
                                    path={mdiSkipNext}
                                    title="Next"
                                    className="icon-small"
                                />
                            </div>
                        </div>

                        <div className="player-sub">
                            <div
                                className="volume-container"
                                onMouseEnter={() => setOpenVolume(true)}
                                onMouseLeave={() => setOpenVolume(false)}
                            >
                                <div className="btn-icon" onClick={onMute}>
                                    {mute ? (
                                        <Icon
                                            className="icon-small"
                                            path={mdiVolumeOff}
                                            title="Volume"
                                        />
                                    ) : (
                                        <Icon
                                            className="icon-small"
                                            path={mdiVolumeHigh}
                                            title="Volume"
                                        />
                                    )}
                                </div>
                                {openVolume && (
                                    <input
                                        type="range"
                                        defaultValue={volume * 100}
                                        onChange={(e) =>
                                            onVolumeChange(e.target.value / 100)
                                        }
                                    />
                                )}
                            </div>
                            <div className="open-queue">
                                {openQueue ? (
                                    <div
                                        className="btn-icon"
                                        onClick={() => setOpenQueue(false)}
                                    >
                                        <Icon
                                            path={mdiChevronDown}
                                            title="Hide queue"
                                            className="icon-small"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="btn-icon"
                                        onClick={() => setOpenQueue(true)}
                                    >
                                        <Icon
                                            path={mdiChevronUp}
                                            title="Show queue"
                                            className="icon-small"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default AudioPlayerComponent;
