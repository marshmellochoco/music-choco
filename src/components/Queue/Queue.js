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
