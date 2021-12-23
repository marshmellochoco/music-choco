import {
    mdiPauseCircleOutline,
    mdiPlayCircleOutline,
    mdiSkipNext,
    mdiSkipPrevious,
} from "@mdi/js";
import Icon from "@mdi/react";

const AudioPlayerControl = ({
    isPlaying,
    pause,
    play,
    previousTrack,
    nextTrack,
}) => {
    return (
        <div className="flex justify-center items-center">
            <div className="btn-icon" onClick={previousTrack}>
                <Icon
                    path={mdiSkipPrevious}
                    title="Previous"
                    className="icon-small text-pink-600"
                />
            </div>
            {isPlaying ? (
                <div className="btn-icon" onClick={pause}>
                    <Icon
                        path={mdiPauseCircleOutline}
                        title="Pause"
                        className="icon-medium text-pink-600"
                    />
                </div>
            ) : (
                <div className="btn-icon" onClick={play}>
                    <Icon
                        path={mdiPlayCircleOutline}
                        title="Play"
                        className="icon-medium text-pink-600"
                    />
                </div>
            )}
            <div className="btn-icon" onClick={nextTrack}>
                <Icon
                    path={mdiSkipNext}
                    title="Next"
                    className={`icon-small text-pink-600`}
                />
            </div>
        </div>
    );
};

export default AudioPlayerControl;
