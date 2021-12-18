const AudioPlayerProgress = ({ seekPercent, lapsed }) => {
    return (
        <div
            className="bottom-24 fixed w-full h-2 z-10 bg-red-50 opacity-60 h:opacity-1 draggable-container cursor-pointer"
            onClick={(e) => seekPercent(e.pageX / e.view.innerWidth)}
        >
            <div
                className="bottom-24 fixed w-full h-2 z-10 progress"
                style={{ transform: `translateX(${lapsed - 100}%)` }}
            >
                <div
                    className="h-3 w-3 bg-red-400 rounded-full ml-auto -mr-1.5 -mt-0.5"
                    draggable
                    onDragEnd={(e) => seekPercent(e.pageX / e.view.innerWidth)}
                />
            </div>
        </div>
    );
};

export default AudioPlayerProgress;
