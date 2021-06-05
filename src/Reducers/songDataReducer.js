const initState = {
    songData: {
        songId: "",
        title: "",
        duration: 0,
        albumname: "",
        albumId: "",
        artist: "",
    },
};

export const songDataReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_SONG_DATA":
            if (!action.songData) return state;
            return {
                ...state,
                songData: action.songData,
            };
        case "SET_PLAYING_SONG":
            return {
                ...state,
                songData: { ...state.songData, songId: action.songId },
            };
        case "RESET_SONG_DATA":
            return {
                initState,
            };
        default:
            return state;
    }
};
