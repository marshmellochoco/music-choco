export const toggleLoop = () => {
    return {
        type: "TOGGLE_LOOP",
    };
};

export const toggleRandom = () => {
    return {
        type: "TOGGLE_RANDOM",
    };
};

export const setPlaying = (playing) => {
    return {
        type: "SET_PLAYING",
        playing,
    };
};

export const setVolume = (volume) => {
    var vol = volume;
    if (volume > 1) {
        vol = 1;
        console.error("Invalid volume", vol);
    }
    return {
        type: "SET_VOLUME",
        volume: vol,
    };
};
