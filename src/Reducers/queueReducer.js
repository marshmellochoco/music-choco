const initState = {
    playing: false,
    queue: [],
    queueData: [],
    loading: false,
};

export const queueReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };
        case "SET_QUEUE":
            return {
                ...state,
                queue: [...action.queue],
            };
        case "ADD_QUEUE":
            if (state.queue.includes(action.songId)) {
                return state;
            }
            return {
                ...state,
                queue: [...state.queue, action.songId],
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
