const AudioPlayerProgress = ({ seekPercent, lapsed }) => {
    return (
        <div
            className="player-progress"
            onClick={(e) => seekPercent(e.pageX / e.view.innerWidth)}
        >
            <div
                className="progress"
                style={{ transform: `translateX(${lapsed - 100}%)` }}
            >
                <div
                    className="progress-thumb"
                    draggable
                    onDragEnd={(e) => seekPercent(e.pageX / e.view.innerWidth)}
                />
            </div>
        </div>
    );
};

export default AudioPlayerProgress;
