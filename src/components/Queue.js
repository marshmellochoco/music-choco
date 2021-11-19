import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { setQueue } from "../store/queue/queueAction";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
        <>
            {openQueue && (
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
            )}
        </>
    );
};

export default Queue;
