import { useEffect } from "react";
import Icon from "@mdi/react";
import { mdiClose, mdiShuffle, mdiSync } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";

import { setQueue } from "../../store/queue/queueAction";
import { setLoop } from "../../store/player/playerAction";
import QueueContent from "./QueueContent";

const Queue = ({ openQueue, setOpenQueue, location }) => {
    const dispatch = useDispatch();
    const queueData = useSelector((state) => state.queueReducer);
    const { playingTrack, loop } = useSelector((state) => state.playerReducer);

    useEffect(() => {
        setOpenQueue(false);
        // eslint-disable-next-line
    }, [location]);

    const closeQueue = () => {
        setOpenQueue(false);
    };

    const shuffle = () => {
        let q = [...queueData];
        q.splice(q.indexOf(playingTrack), 1);
        let shuffled = [...q].sort(() => Math.random() - 0.5);
        dispatch(setQueue([playingTrack, ...shuffled]));
    };

    return (
        <>
            {openQueue && (
                <div className="queue-container">
                    <div className="queue-header">
                        <h1 className="title">Up Next</h1>
                        <div className="flex gap-8">
                            <div className="queue-util">
                                <div
                                    className={loop ? "active" : ""}
                                    onClick={() => dispatch(setLoop(!loop))}
                                >
                                    <Icon
                                        path={mdiSync}
                                        title="Loop"
                                    />
                                </div>
                                <div onClick={shuffle}>
                                    <Icon
                                        path={mdiShuffle}
                                        title="Shuffle"
                                    />
                                </div>
                            </div>
                            <div className="rounded-full hover:bg-gray-200">
                                <Icon
                                    path={mdiClose}
                                    title="Hide queue"
                                    onClick={closeQueue}
                                />
                            </div>
                        </div>
                    </div>
                    <QueueContent
                        queueData={queueData}
                        playingTrack={playingTrack}
                    />
                </div>
            )}
        </>
    );
};

export default Queue;
