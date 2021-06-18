const initState = {
    queue: [],
    randomQueue: [],
    queueData: [],
    loading: false,
};

export const queueReducer = (state = initState, action) => {
    let randQueue = [...state.queue, action.songId];
    switch (action.type) {
        case "SET_QUEUE":
            return {
                ...state,
                queue: [...action.queue],
                randomQueue: [...randQueue.sort(() => Math.random() - 0.5)],
            };
        case "ADD_QUEUE":
            if (state.queue.includes(action.songId)) {
                return state;
            }
            return {
                ...state,
                queue: [...state.queue, action.songId],
                randomQueue: [...randQueue.sort(() => Math.random() - 0.5)],
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.loading,
            };
        case "SET_QUEUE_DATA":
            return {
                ...state,
                queueData: action.queueData,
            };
        default:
            return state;
    }
};
