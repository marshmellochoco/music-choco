const initState = {
    playing: false,
    loop: false,
    volume: 100,
    playingTrack: {
        _id: "",
        name: "",
        icon: "",
        album: {
            _id: "",
            name: "",
            icon: "",
            track: {
                _id: "",
                title: "",
                duration: NaN,
                url: "",
            },
        },
    },
};


const queueReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_PLAYING":
            return { ...state, playing: action.playing };
        case "SET_LOOP":
            return { ...state, loop: action.loop };
        case "SET_PLAYING_SONG":
            return { ...state, playingTrack: action.track };
        case "SET_VOLUME":
            return { ...state, volume: action.volume };
        default:
            return state;
    }
};

export default queueReducer;
