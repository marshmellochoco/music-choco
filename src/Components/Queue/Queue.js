import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Queue.css";

export const Queue = ({
    playingSong,
    setPlayingSong,
    queue,
    setQueue,
    setPlaying,
    apiUrl,
}) => {
    const [queueData, setQueueData] = useState([]);

    const getQueueData = useCallback(async () => {
        var data = [];
        for (let i = 0; i < queue.length; i++) {
            let dataContainer;
            await axios.get(apiUrl + "/song/" + queue[i]).then((res) => {
                dataContainer = res.data;
            });

            await axios
                .get(apiUrl + "/album/" + dataContainer.album)
                .then((res) => {
                    let name = res.data.albumname;
                    data.push({
                        _id: dataContainer._id,
                        title: dataContainer.title,
                        duration: dataContainer.duration,
                        albumname: name,
                    });
                });
        }
        setQueueData(data);
    }, [queue, apiUrl]);

    useEffect(() => {
        getQueueData();
    }, [getQueueData]);

    const skipQueue = (e) => {
        if (e.target.localName !== "svg") {
            let clickedItem = e.currentTarget.getAttribute("datakey");
            setPlayingSong(clickedItem);
            setPlaying(true);
        }
    };

    const removeQueue = async (e) => {
        const oldIndex = queue.indexOf(playingSong);
        let clickedItem = e.currentTarget.getAttribute("datakey");
        let q = queue;
        q.splice(q.indexOf(clickedItem), 1);
        await setQueue([...q]);

        if(queue.indexOf(playingSong) === oldIndex)
            return;

        if (!queue.includes(playingSong)) {
            setPlayingSong(queue[oldIndex]);
        }
    };

    const handleDragDrop = (result) => {
        const data = queueData;
        const [reorderedData] = data.splice(result.source.index, 1);
        data.splice(result.destination.index, 0, reorderedData);
        setQueueData(data);

        const songs = queue;
        const [reorderedSong] = songs.splice(result.source.index, 1);
        songs.splice(result.destination.index, 0, reorderedSong);
        setQueue(songs);
    };

    const getQueueList = (provided) => {
        return queueData.map((q, i) => {
            return (
                <Draggable key={q._id} draggableId={q._id} index={i}>
                    {(provided) => (
                        <div>
                            <li
                                className={`${
                                    playingSong === q._id
                                        ? "queueActive"
                                        : "queueItem"
                                }`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                datakey={q._id}
                                onClick={(e) => skipQueue(e)}
                                onContextMenu={(e) => {
                                    removeQueue(e);
                                }}
                            >
                                <div>{q.title}</div>
                                <div className="album">{q.albumname}</div>
                                <div
                                    className={"removeButton"}
                                    datakey={q._id}
                                    onClick={(e) => {
                                        removeQueue(e);
                                    }}
                                >
                                    <svg className={"icon"} viewBox="0 0 24 24">
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
            <h1>Queue</h1>
            <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <ul
                            className="queueList"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {getQueueList(provided)}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};
