import { authReducer } from "../../Reducers/authReducer";

describe("authReducer test", () => {
    const initState = {
        token: localStorage.getItem("TOKEN"),
    };
    it("should return initial state", () => {
        expect(authReducer(undefined, {})).toEqual(initState);
    });

    it("should handle SET_TOKEN", () => {
        expect(
            authReducer(initState, {
                type: "SET_TOKEN",
                token: "testToken12345",
            })
        ).toEqual({
            ...initState,
            token: "testToken12345",
        });
    });

    it("should handle RESET_TOKEN", () => {
        expect(
            authReducer(initState, {
                type: "RESET_TOKEN",
            })
        ).toEqual({
            ...initState,
            token: "",
        });
    });
});
