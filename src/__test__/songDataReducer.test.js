import { songDataReducer } from "../Reducers/songDataReducer";

describe("songDataReducer test", () => {
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
    const testSongData = {
        songId: "60b67f66f747a945dcc5d27c",
        title: "To the Moon - Main Theme",
        duration: 296,
        albumname: "To the Moon (Original Soundtrack)",
        albumId: "60b67f1ff747a945dcc5d27b",
        artist: "Kan Gao",
    };

    it("should return initial state", () => {
        expect(songDataReducer(undefined, {})).toEqual(initState);
    });

    it("should handle SET_PLAYING_SONG", () => {
        expect(
            songDataReducer(initState, {
                type: "SET_PLAYING_SONG",
                songId: testSongData.songId,
            })
        ).toEqual({
            songData: { ...initState.songData, songId: testSongData.songId },
        });
    });

    it("should handle SET_SONG_DATA", () => {
        expect(
            songDataReducer(initState, {
                type: "SET_SONG_DATA",
                songData: testSongData,
            })
        ).toEqual({ songData: testSongData });
    });
});
