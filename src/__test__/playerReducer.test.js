import { playerReducer } from "../Reducers/playerReducer";

describe("playerReducer test", () => {
    const initState = {
        playing: false,
        loop: false,
        random: false,
    };
    it("should return initial state", () => {
        expect(playerReducer(undefined, {})).toEqual(initState);
    });

    it("should handle SET_PLAYING", () => {
        expect(
            playerReducer(initState, {
                type: "SET_PLAYING",
                playing: true,
            })
        ).toEqual({
            ...initState,
            playing: true,
        });
    });

    it("should handle TOGGLE_LOOP", () => {
        expect(
            playerReducer(initState, {
                type: "TOGGLE_LOOP",
            })
        ).toEqual({
            ...initState,
            loop: true,
        });
    });

    it("should handle TOGGLE_RANDOM", () => {
        expect(
            playerReducer(initState, {
                type: "TOGGLE_RANDOM",
            })
        ).toEqual({
            ...initState,
            random: true,
        });
    });
});
