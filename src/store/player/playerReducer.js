const getVolume = () => {
    return localStorage.getItem("volume");
};

const getLoop = () => {
    return localStorage.getItem("loop");
};

const initState = {
    playing: false,
    loop: getLoop() !== null ? getLoop() : false,
    volume: getVolume() !== null ? getVolume() : 1,
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
            localStorage.setItem("loop", action.loop);
            return { ...state, loop: action.loop };
        case "SET_PLAYING_SONG":
            return { ...state, playingTrack: action.track };
        case "SET_VOLUME":
            localStorage.setItem("volume", action.volume);
            return { ...state, volume: action.volume };
        default:
            return state;
    }
};

export default queueReducer;
