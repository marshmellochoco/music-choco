const initState = {
    queue: [],
    randomQueue: [],
    queueData: [],
    loading: false,
    openQueue: true,
};

export const queueReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_QUEUE":
            return {
                ...state,
                queue: [...action.queue],
                randomQueue: [...action.queue].sort(() => Math.random() - 0.5),
            };
        case "ADD_QUEUE":
            if (state.queue.includes(action.songId)) {
                return state;
            }
            return {
                ...state,
                queue: [...state.queue, action.songId],
                randomQueue: [...state.queue, action.songId].sort(
                    () => Math.random() - 0.5
                ),
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

        case "TOGGLE_QUEUE":
            return {
                ...state,
                openQueue: !state.openQueue,
            };
        default:
            return state;
    }
};
