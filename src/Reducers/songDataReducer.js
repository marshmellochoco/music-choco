const initState = {
    songData: {
        id: "",
        title: "",
        artist: "",
        album: "",
        icon: "",
        duration: 0,
    },
};

export const songDataReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_SONG_DATA":
            return {
                ...state,
                songData: { id: state.songData.id, ...action.songData },
            };
        case "SET_PLAYING_SONG":
            return {
                ...state,
                songData: { ...state.songData, songId: action.songId },
            };
        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };
        default:
            return state;
    }
};
