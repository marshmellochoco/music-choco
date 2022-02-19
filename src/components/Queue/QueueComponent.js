import Icon from "@mdi/react";
import { mdiClose, mdiShuffle, mdiSync } from "@mdi/js";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { Link } from "react-router-dom";
import ArtistList from "../ArtistList";

const QueueComponent = ({
    loop,
    queueData,
    playingTrack,
    onShuffle,
    onDragDrop,
    onSetTrack,
    onRemoveQueue,
    onToggleLoop,
    onCloseQueue,
}) => {
    const getDuration = (duration) => {
        return (
            (duration / 60 < 10 ? "0" : "") +
            Math.floor(duration / 60) +
            ":" +
            (duration % 60 < 10 ? "0" : "") +
            Math.floor(duration % 60)
        );
    };

    const getQueueList = (queue, playingTrack) => {
        const onTrackClick = (e, q) => {
            if (!e.target.className.includes("link-item")) onSetTrack(q);
        };

        return queue.map((q, i) => {
            const isPlayingTrack = playingTrack.id === q.id;
            return (
                <div key={`queue_${q.id}`}>
                    <ContextMenuTrigger id={`queueListContextMenu_${q.id}`}>
                        <Draggable draggableId={q.id} index={i}>
                            {(provided, snapshot) => (
                                <div
                                    onClick={(e) => onTrackClick(e, q)}
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
                        <MenuItem onClick={() => onRemoveQueue(q)}>
                            Remove from queue
                        </MenuItem>
                    </ContextMenu>
                </div>
            );
        });
    };

    const QueueItem = ({ item }) => {
        return (
            <li className="queue-item">
                <div className="item-title">
                    <b>{item.name}</b>
                    <ArtistList artists={item.artists} />
                </div>
                <div className="item-album">
                    <Link
                        to={`/album/${item.album.id}`}
                        className="link-item"
                        title={item.album.name}
                    >
                        {item.album.name}
                    </Link>
                </div>
                <div className="text-right">{getDuration(item.duration)}</div>
            </li>
        );
    };

    return (
        <div className="queue-container">
            <div className="queue-header">
                <h1 className="title">Up Next</h1>
                <div className="queue-header-buttons">
                    <div className="queue-util">
                        <div
                            className={`btn-icon ${loop ? "active" : ""}`}
                            onClick={onToggleLoop}
                        >
                            <Icon path={mdiSync} title="Loop" />
                        </div>
                        <div className="btn-icon" onClick={onShuffle}>
                            <Icon path={mdiShuffle} title="Shuffle" />
                        </div>
                    </div>
                    <div className="queue-btn-close">
                        <Icon
                            className="btn-icon"
                            path={mdiClose}
                            title="Hide queue"
                            onClick={onCloseQueue}
                        />
                    </div>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragDrop}>
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
