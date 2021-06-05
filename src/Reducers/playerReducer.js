const initState = {
    playing: false,
    loop: false,
    random: false,
};

export const playerReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };
        case "TOGGLE_LOOP":
            return {
                ...state,
                loop: !state.loop,
            };
        case "TOGGLE_RANDOM":
            return {
                ...state,
                random: !state.random,
            };
        case "RESET_PLAYER":
            return {
                initState,
            };
        default:
            return state;
    }
};
