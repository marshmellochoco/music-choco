export const setPlaying = (playing) => {
    return {
        type: "SET_PLAYING",
        playing,
    };
};

export const setLoop = (loop) => {
    return {
        type: "SET_LOOP",
        loop,
    };
};

export const setPlayingTrack = (track) => {
    return {
        type: "SET_PLAYING_SONG",
        track,
    };
};

export const setVolume = (volume) => {
    return {
        type: "SET_VOLUME",
        volume,
    };
};