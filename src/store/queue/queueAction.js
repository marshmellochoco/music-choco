export const setQueue = (queue) => {
    return {
        type: "SET_QUEUE",
        queue,
    };
};

export const addQueue = (item) => {
    return {
        type: "ADD_QUEUE",
        item,
    };
};
