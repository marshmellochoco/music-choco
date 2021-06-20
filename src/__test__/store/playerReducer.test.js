import { playerReducer } from "../../store/reducers/playerReducer";
import {
    setPlaying,
    setVolume,
    toggleLoop,
    toggleRandom,
} from "../../store/actions/playerActions";

describe("playerReducer test", () => {
    const initState = {
        playing: false,
        loop: false,
        random: false,
        volume: 1,
    };

    it("should return initial state", () => {
        expect(playerReducer(undefined, {})).toEqual(initState);
    });

    it("should handle SET_PLAYING", () => {
        expect(playerReducer(initState, setPlaying(true))).toEqual({
            ...initState,
            playing: true,
        });
    });

    // TODO: Test SET_PLAYING will handle non boolean value

    it("should handle SET_VOLUME", () => {
        expect(playerReducer(initState, setVolume(0.4))).toEqual({
            ...initState,
            volume: 0.4,
        });
    });

    it("should not allow volume greater than 1", () => {
        expect(playerReducer(initState, setVolume(250))).toEqual({
            ...initState,
            volume: 1,
        });
    });

    // TODO: Test SET_VOLUME will handle non double value

    it("should handle TOGGLE_LOOP", () => {
        expect(playerReducer(initState, toggleLoop())).toEqual({
            ...initState,
            loop: true,
        });
    });

    it("should handle TOGGLE_RANDOM", () => {
        expect(playerReducer(initState, toggleRandom())).toEqual({
            ...initState,
            random: true,
        });
    });
});
