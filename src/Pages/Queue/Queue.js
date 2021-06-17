// dependancy import
import { useEffect } from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

// component import
import "./Queue.css";
import Icon from "@mdi/react";
import { mdiShuffle, mdiSync } from "@mdi/js";
import {
    setPlayingSong,
    setSongData,
} from "../../store/actions/songDataAction";
import {
    setLoading,
    setQueue,
    setQueueData,
} from "../../store/actions/queurAction";

export const Queue = ({ setRandomQueue }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const playingSong = useSelector(
        (state) => state.songDataReducer.songData.songId
    );
    const queue = useSelector((state) => state.queueReducer.queue);
    const queueData = useSelector((state) => state.queueReducer.queueData);
    const loading = useSelector((state) => state.queueReducer.loading);
    const isLoop = useSelector((state) => state.playerReducer.loop);
    const isRandom = useSelector((state) => state.playerReducer.random);
    const dispatch = useDispatch();

    useEffect(() => {
        const getQueueData = async (qdCache) => {
            var data = [];
            dispatch(setLoading(true));

            for (let i = 0; i < queue.length; i++) {
                let found = false;
                for (let j = 0; j < qdCache.length; j++) {
                    if (queue[i] === qdCache[j].songId) {
                        data.push(qdCache[j]);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    await axios
                        .get(`${apiUrl}/song/${queue[i]}`)
                        .then((result) => {
                            data.push({
                                songId: result.data.songs._id,
                                title: result.data.songs.title,
                                duration: result.data.songs.duration,
                                albumname: result.data.albumname,
                                albumId: result.data._id,
                                artist: result.data.artist,
                            });
                        })
                        .catch((e) => console.log(e));
                }
            }
            return data;
        };

        getQueueData(queueData).then((res) => {
            dispatch(setQueueData(res));
            dispatch(setLoading(false));
            if (res.length <= 0) return;
            if (playingSong) {
                dispatch(
                    setSongData(
                        res[
                            res
                                .map((qd) => {
                                    return qd.songId;
                                })
                                .indexOf(playingSong)
                        ]
                    )
                );
            }
        });

        let randQueue = [...queue];
        setRandomQueue(randQueue.sort(() => Math.random() - 0.5));
    }, [queue]); // eslint-disable-line

    useEffect(() => {
        if (!playingSong) return;
        const qdList = queueData.map((qd) => {
            return qd.songId;
        });
        if (qdList.includes(playingSong))
            dispatch(setSongData(queueData[qdList.indexOf(playingSong)]));

        const item = document.getElementById(playingSong);
        if (!item) return;
        item.scrollIntoView(false);
    }, [playingSong]); // eslint-disable-line

    const skipQueue = (e) => {
        // If the item is clicked, and it is not the trash can icon, play the clicked song instead
        if (e.target.getAttribute("class") !== "notToPlay") {
            let clickedItem = e.currentTarget.getAttribute("datakey");
            setPlayingSong(clickedItem);
            dispatch({ type: "SET_PLAYING", playing: true });
        }
    };

    const removeQueue = async (e) => {
        // remove the selected song from queue
        let clickedItem = e.currentTarget.getAttribute("datakey");
        if (clickedItem === playingSong) {
            setPlayingSong("");
            dispatch({ type: "SET_PLAYING", playing: false });
        }

        let q = queue;
        q.splice(queue.indexOf(clickedItem), 1);
        dispatch(setQueue(q));
    };

    const handleDragDrop = (result) => {
        // re-position the queue according to the drop location of the dragged item
        if (!result.destination) return;

        const songs = queue;
        const [reorderedSong] = songs.splice(result.source.index, 1);
        songs.splice(result.destination.index, 0, reorderedSong);
        dispatch(setQueue(songs));
    };

    const getQueueList = (provided, data) => {
        // get the list of detail fo the queued songs as component array
        return data.map((q, i) => {
            return (
                <Draggable key={q.songId} draggableId={q.songId} index={i}>
                    {(provided, snapshot) => (
                        <div
                            id={q.songId}
                            className={`${
                                playingSong === q.songId
                                    ? "queueActive"
                                    : "queueItem"
                            }
                            ${snapshot.isDragging ? "dragging" : ""}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            datakey={q.songId}
                            onClick={(e) => skipQueue(e)}
                            onContextMenu={(e) => {
                                removeQueue(e);
                            }}
                        >
                            <li>
                                <div className="title">{q.title}</div>
                                <div className="album">{q.albumname}</div>
                                <div
                                    className={"removeButton icon notToPlay"}
                                    datakey={q.songId}
                                    onClick={(e) => removeQueue(e)}
                                >
                                    <svg
                                        className="notToPlay"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className="notToPlay"
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
                    <Icon
                        path={mdiShuffle}
                        className={`buttonIcon  icons ${
                            isRandom ? "active" : ""
                        }`}
                        onClick={() => dispatch({ type: "TOGGLE_RANDOM" })}
                    />
                    <Icon
                        path={mdiSync}
                        className={`buttonIcon  icons ${
                            isLoop ? "active" : ""
                        }`}
                        onClick={() => dispatch({ type: "TOGGLE_LOOP" })}
                    />
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
                                {getQueueList(
                                    provided,
                                    queueData.length > 0 ? queueData : []
                                )}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
};
