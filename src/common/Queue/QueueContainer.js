import { QueueComponent } from "./QueueComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toggleLoop, toggleRandom } from "../../store/actions/playerActions";
import { setQueue, setQueueData } from "../../store/actions/queueAction";
import { setSongData } from "../../store/actions/songDataAction";
import { QueueListComponent } from "./QueueListComponent";

export const QueueContainer = ({ setRandomQueue }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(false);
    const playingSong = useSelector(
        (state) => state.songDataReducer.songData.songId
    );
    const queue = useSelector((state) => state.queueReducer.queue);
    const queueData = useSelector((state) => state.queueReducer.queueData);
    const isLoop = useSelector((state) => state.playerReducer.loop);
    const isRandom = useSelector((state) => state.playerReducer.random);
    const dispatch = useDispatch();

    useEffect(() => {
        const getQueueData = async (qdCache) => {
            var data = [];
            setLoading(true);

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
            setLoading(false);
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

    const changeRandom = () => {
        dispatch(toggleRandom());
    };

    const changeLoop = () => {
        dispatch(toggleLoop());
    };

    return (
        <QueueComponent
            isLoop={isLoop}
            isRandom={isRandom}
            loading={loading}
            toggleRandom={changeRandom}
            toggleLoop={changeLoop}
            handleDragDrop={handleDragDrop}
            queueList={QueueListComponent({
                data: queueData.length > 0 ? queueData : [],
                playingSong,
            })}
        />
    );
};
