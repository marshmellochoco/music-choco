import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { useDispatch } from "react-redux";

import { setPlaying, setPlayingTrack } from "../../store/player/playerAction";
import { setQueue } from "../../store/queue/queueAction";
import QueueItem from "./QueueItem";

const QueueContent = ({ queueData, playingTrack }) => {
    const dispatch = useDispatch();

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

    const removeFromQueue = (q) => {
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

    const getQueueList = (queue, playingTrack) => {
        return queue.map((q, i) => {
            const isPlayingTrack = playingTrack.id === q.id;
            return (
                <div key={`queue_${q.id}`}>
                    <ContextMenuTrigger id={`queueListContextMenu_${q.id}`}>
                        <Draggable draggableId={q.id} index={i}>
                            {(provided, snapshot) => (
                                <div
                                    onClick={(e) => {
                                        if (
                                            !e.target.className.includes(
                                                "link-item"
                                            )
                                        )
                                            setTrack(q);
                                    }}
                                    id={q.id}
                                    className={
                                        isPlayingTrack
                                            ? "queue-item-active"
                                            : snapshot.isDragging
                                            ? "queue-item-dragging"
                                            : ""
                                    }
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    datakey={q.id}
                                >
                                    <QueueItem item={q} />
                                </div>
                            )}
                        </Draggable>
                    </ContextMenuTrigger>
                    <ContextMenu
                        key={q.id + "test"}
                        id={`queueListContextMenu_${q.id}`}
                    >
                        <MenuItem onClick={() => removeFromQueue(q)}>
                            Remove from queue
                        </MenuItem>
                    </ContextMenu>
                </div>
            );
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {getQueueList(queueData, playingTrack)}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default QueueContent;
