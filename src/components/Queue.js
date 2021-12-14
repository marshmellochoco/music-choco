import Icon from "@mdi/react";
import { useEffect } from "react";
import { mdiClose, mdiShuffle, mdiSync } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { setQueue } from "../store/queue/queueAction";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { setLoop } from "../store/player/playerAction";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

const Queue = ({ openQueue, setOpenQueue }) => {
    const location = useLocation();

    useEffect(() => {
        setOpenQueue(false);
        // eslint-disable-next-line
    }, [location]);

    const dispatch = useDispatch();
    const queueData = useSelector((state) => state.queueReducer);
    const { playingTrack, loop } = useSelector((state) => state.playerReducer);

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

    const closeQueue = () => {
        setOpenQueue(false);
    };

    const shuffle = () => {
        let q = [...queueData];
        q.splice(q.indexOf(playingTrack), 1);
        let shuffled = [...q].sort(() => Math.random() - 0.5);
        dispatch(setQueue([playingTrack, ...shuffled]));
    };

    const getQueueList = (queue, playingTrack) => {
        return queue.map((q, i) => {
            const isPlayingTrack = playingTrack._id === q._id;
            return (
                <div key={q._id}>
                    <ContextMenuTrigger id={`queueListContextMenu_${q._id}`}>
                        <Draggable key={q._id} draggableId={q._id} index={i}>
                            {(provided, snapshot) => (
                                <div
                                    onClick={(e) => {
                                        if (
                                            !e.target.className.includes(
                                                "hover:underline"
                                            )
                                        )
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
                                        <div className="col-span-6">
                                            <b>{q.title}</b>
                                            <div className="artistList">
                                                {q.artists.map((a) => (
                                                    <Link
                                                        key={a._id}
                                                        to={`/artist/${a._id}`}
                                                        className="hover:underline linkItem"
                                                    >
                                                        {a.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-span-3 mr-2 artistList">
                                            <Link
                                                to={`/album/${q.album._id}`}
                                                className="hover:underline"
                                            >
                                                {q.album.name}
                                            </Link>
                                        </div>
                                        <div className="text-right">
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
                    </ContextMenuTrigger>
                    <ContextMenu
                        key={q._id + "test"}
                        id={`queueListContextMenu_${q._id}`}
                        className="contextMenu"
                    >
                        <MenuItem
                            onClick={() => removeFromQueue(q)}
                            className="menuItem"
                        >
                            Remove from queue
                        </MenuItem>
                    </ContextMenu>
                </div>
            );
        });
    };

    return (
        <>
            {openQueue && (
                <div className="bg-white content mx-2">
                    <div className="flex justify-between items-center">
                        <h1 className="title">Up Next</h1>
                        <div className="flex gap-10">
                            <div className="flex gap-6">
                                <div
                                    className={`rounded-full hover:bg-red-100 ${
                                        loop
                                            ? "bg-pink-100 hover:bg-red-200"
                                            : ""
                                    }`}
                                >
                                    <Icon
                                        path={mdiSync}
                                        title="Loop"
                                        className="icon-small fill-current text-pink-600"
                                        onClick={() => dispatch(setLoop(!loop))}
                                    />
                                </div>
                                <div className="rounded-full hover:bg-red-100">
                                    <Icon
                                        path={mdiShuffle}
                                        title="Shuffle"
                                        className={
                                            "icon-small fill-current text-pink-600"
                                        }
                                        onClick={shuffle}
                                    />
                                </div>
                            </div>
                            <div className="rounded-full hover:bg-gray-200">
                                <Icon
                                    path={mdiClose}
                                    title="Close"
                                    className="icon-small"
                                    onClick={closeQueue}
                                />
                            </div>
                        </div>
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
