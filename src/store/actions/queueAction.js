export const setQueue = (queue) => {
    let randQueue = [...queue];
    return {
        type: "SET_QUEUE",
        queue,
    };
};

export const addQueue = (songId) => {
    return {
        type: "ADD_QUEUE",
        songId,
    };
};

export const setLoading = (loading) => {
    return {
        type: "SET_LOADING",
        loading,
    };
};

export const setQueueData = (queueData) => {
    return {
        type: "SET_QUEUE_DATA",
        queueData,
    };
};

export const toggleQueue = () => {
    console.log("toggle");
    return {
        type: "TOGGLE_QUEUE",
    };
};
