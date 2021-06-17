export const setSongData = (songData) => {
    return {
        type: "SET_SONG_DATA",
        songData,
    };
};

export const setPlayingSong = (songId) => {
    return {
        type: "SET_PLAYING_SONG",
        songId,
    };
};
