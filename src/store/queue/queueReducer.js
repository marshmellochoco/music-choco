const initState = [];

const queueReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_QUEUE":
            return action.queue;
        case "ADD_QUEUE":
            return [...state, action.item];
        default:
            return state;
    }
};

export default queueReducer;
