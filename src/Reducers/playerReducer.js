const initState = {
    playing: false,
    loop: localStorage.getItem("playerLoop") === "true",
    random: localStorage.getItem("playerRandom") === "true",
    volume:
        localStorage.getItem("playerVolume") &&
        localStorage.getItem("playerVolume") !== "null"
            ? parseFloat(localStorage.getItem("playerVolume"))
            : 1,
};

export const playerReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };
        case "SET_VOLUME":
            localStorage.setItem("playerVolume", action.volume);
            return {
                ...state,
                volume: action.volume,
            };
        case "TOGGLE_LOOP":
            localStorage.setItem("playerLoop", !state.loop);
            return {
                ...state,
                loop: !state.loop,
            };
        case "TOGGLE_RANDOM":
            localStorage.setItem("playerRandom", !state.random);
            return {
                ...state,
                random: !state.random,
            };
        default:
            return state;
    }
};
