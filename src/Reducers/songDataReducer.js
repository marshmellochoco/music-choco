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
            return {
                ...state,
                songData: action.songData,
            };
        case "SET_PLAYING_SONG":
            return {
                ...state,
                songData: { ...state.songData, songId: action.songId },
            };
        default:
            return state;
    }
};
