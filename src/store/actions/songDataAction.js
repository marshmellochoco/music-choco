import { setUserPlaying } from "../../api";

export const setSongData = (songData) => {
    return {
        type: "SET_SONG_DATA",
        songData,
    };
};

export const setPlayingSong = (songId, authToken) => {
    setUserPlaying(authToken, songId).then().catch((e) => console.log(e));
    return {
        type: "SET_PLAYING_SONG",
        songId,
    };
};
