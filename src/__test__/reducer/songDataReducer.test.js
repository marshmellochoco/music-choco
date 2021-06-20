import { songDataReducer } from "../../store/reducers/songDataReducer";
import {
    setPlayingSong,
    setSongData,
} from "../../store/actions/songDataAction";

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
            songDataReducer(initState, setPlayingSong(testSongData.songId))
        ).toEqual({
            songData: { ...initState.songData, songId: testSongData.songId },
        });
    });

    // TODO: Test SET_PLAYING_SONG can handle non string value

    it("should handle SET_SONG_DATA", () => {
        expect(songDataReducer(initState, setSongData(testSongData))).toEqual({
            songData: testSongData,
        });
    });

    // TODO: Test SET_SONG_DATA can handle object without the required field
});
