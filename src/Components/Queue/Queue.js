import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./Queue.css";

export const Queue = ({ index, setIndex, queue, setQueue, setPlaying, apiUrl }) => {
    const [queueData, setQueueData] = useState([]);

    const getQueueData = useCallback(async () => {
        var data = [];
        for (let i = 0; i < queue.length; i++) {
            let dataContainer;
            await axios
                .get(apiUrl + "/song/" + queue[i])
                .then((res) => {
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
        let clickedItem = e.currentTarget.getAttribute("datakey");
        setIndex(queue.indexOf(clickedItem));
        setPlaying(true);
    };

    const removeQueue = (e) => {
        let clickedItem = e.currentTarget.getAttribute("datakey");
        let q = queue;
        q.splice(q.indexOf(clickedItem), 1);
        setQueue([...q]);
    };

    const getQueueList = () => {
        return queueData.map((q, i) => {
            return (
                <li
                    key={q._id}
                    className={`${
                        queue[index] === q._id ? "queueActive" : "queueItem"
                    }`}
                    datakey={q._id}
                    onClick={(e) => skipQueue(e)}
                    onContextMenu={(e) => removeQueue(e)}
                >
                    <div className="num">{i + 1}</div>
                    <div>{q.title}</div>
                    <div className="album">{q.albumname}</div>
                    <div className="duration">
                        {" "}
                        {(q.duration / 60 < 10 ? "0" : "") +
                            Math.floor(q.duration / 60)}{" "}
                        :{" "}
                        {(q.duration % 60 < 10 ? "0" : "") +
                            Math.floor(q.duration % 60)}
                    </div>
                </li>
            );
        });
    };

    return (
        <div className="queue">
            <h1>Queue</h1>
            <ul className="queueList">{getQueueList()}</ul>
        </div>
    );
};
