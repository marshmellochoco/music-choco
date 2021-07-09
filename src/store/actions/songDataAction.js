import { setUserPlaying } from "../../api";

export const setSongData = (songData) => {
    return {
        type: "SET_SONG_DATA",
        songData,
    };
};

const setPlayingSongAction = (songId) => {
    return {
        type: "SET_PLAYING_SONG",
        songId,
    };
};

export const setPlayingSong = (dispatch, songId, token) => {
    dispatch(setPlayingSongAction(songId));
    setUserPlaying(token, songId).catch((e) => console.log(e));
};
