const loop =
    localStorage.getItem("playerLoop") &&
    localStorage.getItem("playerLoop") !== "null"
        ? localStorage.getItem("playerLoop")
        : false;

const random =
    localStorage.getItem("playerRandom") &&
    localStorage.getItem("playerRandom") !== "null"
        ? localStorage.getItem("playerRandom")
        : false;

const volume =
    localStorage.getItem("playerVolume") &&
    localStorage.getItem("playerVolume") !== "null"
        ? localStorage.getItem("playerVolume")
        : 1;

const initState = {
    playing: false,
    loop: loop,
    random: random,
    volume: volume,
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
