import { getTrack } from "../api/trackApi";
import { setPlaying, setPlayingTrack } from "../store/player/playerAction";
import { addQueue } from "../store/queue/queueAction";

export const playTrack = (dispatch, id, queue, playingTrack) => {
    addTrack(dispatch, id, queue).then((result) => {
        if (result._id !== playingTrack._id) dispatch(setPlayingTrack(result));
        dispatch(setPlaying(true));
    });
};

export const addTrack = async (dispatch, id, queue) => {
    let res;
    await getTrack(id).then((result) => {
        if (queue.length === 0) {
            dispatch(setPlaying(false));
            dispatch(setPlayingTrack(result));
        }
        if (queue.filter((x) => x._id === id).length === 0)
            dispatch(addQueue(result));
        res = result;
    });
    return res;
};

export const addTrackToPlaylist = async (id) => {
    // TODO: Implement add to playlist
};
