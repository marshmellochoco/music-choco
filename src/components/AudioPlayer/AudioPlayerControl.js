import {
    mdiPauseCircleOutline,
    mdiPlayCircleOutline,
    mdiSkipNext,
    mdiSkipPrevious,
} from "@mdi/js";
import Icon from "@mdi/react";

const AudioPlayerControl = ({ isPlaying, pause, play, previousTrack, nextTrack }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="rounded-full hover:bg-red-200">
                <Icon
                    path={mdiSkipPrevious}
                    title="Previous"
                    className="icon-small text-pink-600"
                    onClick={previousTrack}
                />
            </div>
            {isPlaying ? (
                <div className="rounded-full hover:bg-red-200">
                    <Icon
                        path={mdiPauseCircleOutline}
                        title="Pause"
                        className="icon-medium text-pink-600"
                        onClick={pause}
                    />
                </div>
            ) : (
                <div className="rounded-full hover:bg-red-200">
                    <Icon
                        path={mdiPlayCircleOutline}
                        title="Play"
                        className="icon-medium text-pink-600"
                        onClick={play}
                    />
                </div>
            )}
            <div className="rounded-full hover:bg-red-200">
                <Icon
                    path={mdiSkipNext}
                    title="Next"
                    className="icon-small text-pink-600"
                    onClick={nextTrack}
                />
            </div>
        </div>
    );
};

export default AudioPlayerControl;
