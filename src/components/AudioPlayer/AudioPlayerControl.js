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
        <div className="player-control">
            <div onClick={previousTrack}>
                <Icon
                    path={mdiSkipPrevious}
                    title="Previous"
                    className="icon-small"
                />
            </div>
            {isPlaying ? (
                <div onClick={pause}>
                    <Icon
                        path={mdiPauseCircleOutline}
                        title="Pause"
                        className="icon-medium"
                    />
                </div>
            ) : (
                <div onClick={play}>
                    <Icon
                        path={mdiPlayCircleOutline}
                        title="Play"
                        className="icon-medium"
                    />
                </div>
            )}
            <div onClick={nextTrack}>
                <Icon
                    path={mdiSkipNext}
                    title="Next"
                    className={`icon-small`}
                />
            </div>
        </div>
    );
};

export default AudioPlayerControl;
