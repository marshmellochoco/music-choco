import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactLoading from "react-loading";
import "./Queue.css";

export const Queue = ({
    playingSong,
    setPlayingSong,
    queue,
    setQueue,
    setPlaying,
    apiUrl,
    isRandom,
    setRandom,
    isLoop,
    setLoop,
    setRandomQueue,
}) => {
    const [queueData, setQueueData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getQueueData = async () => {
            var data = [];
            setQueueData([]);
            setLoading(true);

            for (let i = 0; i < queue.length; i++) {
                let found = false;
                for (let j = 0; j < qdCache.length; j++) {
                    if (queue[i] === qdCache[j]._id) {
                        data.push(qdCache[j]);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    await axios
                        .get(apiUrl + "/song/" + queue[i])
                        .then((result) => {
                            data.push({
                                _id: result.data.songs._id,
                                title: result.data.songs.title,
                                duration: result.data.songs.duration,
                                albumname: result.data.albumname
                            })
                        });
                }
            }
            setQueueData(data);
            setLoading(false);
        };

        const qdCache = queueData;
        getQueueData();

        let randQueue = [...queue];
        setRandomQueue(randQueue.sort(() => Math.random() - 0.5));
    }, [queue]); // eslint-disable-line

    useEffect(() => {
        if (!playingSong) return;
        const item = document.getElementById(playingSong);
        if (!item) return;
        item.scrollIntoView(false);
    }, [playingSong]);

    const skipQueue = (e) => {
        if (e.target.localName !== "svg") {
            let clickedItem = e.currentTarget.getAttribute("datakey");
            setPlayingSong(clickedItem);
            setPlaying(true);
        }
    };

    const removeQueue = async (e) => {
        let clickedItem = e.currentTarget.getAttribute("datakey");

        let q = queue;
        q.splice(queue.indexOf(clickedItem), 1);
        setQueue([...q]);

        if (clickedItem === playingSong) {
            setPlayingSong("");
            setPlaying(false);
        }
    };

    const handleDragDrop = (result) => {
        if (!result.destination) return;
        const data = queueData;
        const [reorderedData] = data.splice(result.source.index, 1);
        data.splice(result.destination.index, 0, reorderedData);
        setQueueData(data);

        const songs = queue;
        const [reorderedSong] = songs.splice(result.source.index, 1);
        songs.splice(result.destination.index, 0, reorderedSong);
        setQueue(songs);
    };

    const getQueueList = (provided, data) => {
        return data.map((q, i) => {
            return (
                <Draggable key={q._id} draggableId={q._id} index={i}>
                    {(provided, snapshot) => (
                        <div
                            id={q._id}
                            className={`${
                                playingSong === q._id
                                    ? "queueActive"
                                    : "queueItem"
                            }
                            ${snapshot.isDragging ? "dragging" : ""}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            datakey={q._id}
                            onClick={(e) => skipQueue(e)}
                            onContextMenu={(e) => {
                                removeQueue(e);
                            }}
                        >
                            <li>
                                <div className="title">{q.title}</div>
                                <div className="album">{q.albumname}</div>
                                <div
                                    className={"removeButton icon"}
                                    datakey={q._id}
                                    onClick={(e) => removeQueue(e)}
                                >
                                    <svg viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                                        />
                                    </svg>
                                </div>
                                <div className="duration">
                                    {" "}
                                    {(q.duration / 60 < 10 ? "0" : "") +
                                        Math.floor(q.duration / 60)}{" "}
                                    :{" "}
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
        <div className="queue">
            <div className="queueHeader">
                <h1>Queue</h1>
                <div className="controls">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        className={`icons ${isRandom ? "active" : ""}`}
                        onClick={() => setRandom(!isRandom)}
                    >
                        <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        className={`icons ${isLoop ? "active" : ""}`}
                        onClick={() => setLoop(!isLoop)}
                    >
                        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                    </svg>
                </div>
            </div>
            {loading ? (
                <ReactLoading className="loading" type="bars" />
            ) : (
                <DragDropContext onDragEnd={handleDragDrop}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <ul
                                className="queueList"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {getQueueList(provided, queueData)}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
};
