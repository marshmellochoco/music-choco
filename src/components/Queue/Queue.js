import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import QueueComponent from "./QueueComponent";
import { setQueue } from "../../store/queue/queueAction";
import {
    setPlaying,
    setLoop,
    setPlayingTrack,
} from "../../store/player/playerAction";

const Queue = ({ openQueue, setOpenQueue, location }) => {
    const dispatch = useDispatch();
    const queueData = useSelector((state) => state.queueReducer);
    const { playingTrack, loop } = useSelector((state) => state.playerReducer);

    useEffect(() => {
        setOpenQueue(false);
        // eslint-disable-next-line
    }, [location]);

    const onCloseQueue = () => {
        setOpenQueue(false);
    };

    const onShuffle = () => {
        let q = [...queueData];
        q.splice(q.indexOf(playingTrack), 1);
        let shuffled = [...q].sort(() => Math.random() - 0.5);
        dispatch(setQueue([playingTrack, ...shuffled]));
    };

    const onDragDrop = (result) => {
        if (!result.destination) return;

        const q = [...queueData];
        const [s] = q.splice(result.source.index, 1);
        q.splice(result.destination.index, 0, s);
        dispatch(setQueue(q));
    };

    const onSetTrack = (trackData) => {
        dispatch(setPlayingTrack(trackData));
        dispatch(setPlaying(true));
    };

    const onRemoveQueue = (q) => {
        let index = queueData.indexOf(q);
        if (
            index === queueData.indexOf(playingTrack) &&
            queueData.length !== 0
        ) {
            if (index === queueData.length - 1)
                dispatch(setPlayingTrack(queueData[index - 1]));
            else dispatch(setPlayingTrack(queueData[index + 1]));
        }
        let newQueue = queueData.filter((_, i) => i !== index);
        dispatch(setQueue(newQueue));
    };

    const onToggleLoop = () => {
        dispatch(setLoop(!loop));
    };

    return (
        <>
            {openQueue && (
                <QueueComponent
                    loop={loop}
                    queueData={queueData}
                    playingTrack={playingTrack}
                    onShuffle={onShuffle}
                    onDragDrop={onDragDrop}
                    onSetTrack={onSetTrack}
                    onRemoveQueue={onRemoveQueue}
                    onToggleLoop={onToggleLoop}
                    onCloseQueue={onCloseQueue}
                />
            )}
        </>
    );
};

export default Queue;
