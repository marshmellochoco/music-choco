import { useDispatch, useSelector } from "react-redux";
import { setPlaying, setPlayingTrack } from "../../store/player/playerAction";
import { setQueue } from "../../store/queue/queueAction";
import QueueComponent from "./QueueComponent";

const Queue = ({ openQueue, setOpenQueue }) => {
    const dispatch = useDispatch();
    const queueData = useSelector((state) => state.queueReducer);
    const { playingTrack } = useSelector((state) => state.playerReducer);

    const handleDragDrop = (result) => {
        if (!result.destination) return;

        const q = [...queueData];
        const [s] = q.splice(result.source.index, 1);
        q.splice(result.destination.index, 0, s);
        dispatch(setQueue(q));
    };

    const setTrack = (trackData) => {
        dispatch(setPlayingTrack(trackData));
        dispatch(setPlaying(true));
    };

    return (
        <>
            {openQueue && (
                <QueueComponent
                    queueData={queueData}
                    playingTrack={playingTrack}
                    setTrack={setTrack}
                    handleDragDrop={handleDragDrop}
                    setOpenQueue={setOpenQueue}
                />
            )}
        </>
    );
};

export default Queue;
