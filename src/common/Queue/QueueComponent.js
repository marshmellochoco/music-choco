import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router";

const QueueComponent = ({
    queueData,
    playingTrack,
    setTrack,
    handleDragDrop,
    setOpenQueue,
}) => {
    const history = useHistory();

    const closeQueue = () => {
        setOpenQueue(false);
    };

    const gotoAlbum = (id) => {
        history.push(`/album/${id}`);
        setOpenQueue(false);
    };

    const getQueueList = (queue, playingTrack) => {
        return queue.map((q, i) => {
            const isPlayingTrack = playingTrack._id === q._id;
            return (
                <Draggable key={q._id} draggableId={q._id} index={i}>
                    {(provided, snapshot) => (
                        <div
                            onClick={(e) => {
                                if (e.target.className !== "hover:underline")
                                    setTrack(q);
                            }}
                            id={q._id}
                            className={`${
                                isPlayingTrack
                                    ? "queue-item-active hover:bg-red-200"
                                    : snapshot.isDragging
                                    ? "queue-item-dragging"
                                    : "hover:bg-red-50"
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            datakey={q._id}
                        >
                            <li className="queue-item">
                                <div>
                                    <b>{q.title}</b>
                                    <div
                                        className="hover:underline"
                                        onClick={() => {
                                            gotoAlbum(q.album._id);
                                        }}
                                    >
                                        {q.album.name}
                                    </div>
                                </div>
                                <div>
                                    {(q.duration / 60 < 10 ? "0" : "") +
                                        Math.floor(q.duration / 60)}
                                    :
                                    {(q.duration % 60 < 10 ? "0" : "") +
                                        Math.floor(q.duration % 60)}
                                </div>
                            </li>
                        </div>
                    )}
                </Draggable>
            );
        });
    };

    return (
        <div className="bg-white content mx-2">
            <div className="flex justify-between items-center">
                <h1 className="title">Up Next</h1>
                <Icon
                    path={mdiClose}
                    title="Close"
                    className="icon-small hover:opacity-60"
                    onClick={closeQueue}
                />
            </div>
            <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {getQueueList(queueData, playingTrack)}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default QueueComponent;
