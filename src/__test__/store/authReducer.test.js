import { authReducer } from "../../store/reducers/authReducer";
import { resetToken, setToken } from "../../store/actions/authActions";

describe("authReducer test", () => {
    const initState = {
        token: localStorage.getItem("TOKEN"),
        user: localStorage.getItem("UID"),
    };

    it("should return initial state", () => {
        expect(authReducer(undefined, {})).toEqual(initState);
    });

    it("should handle SET_TOKEN", () => {
        expect(
            authReducer(initState, setToken("testToken12345", "testUser12345"))
        ).toEqual({
            ...initState,
            token: "testToken12345",
            user: "testUser12345",
        });
    });

    // TODO: Test if the token is string

    // TODO: Test if the user is string

    it("should handle RESET_TOKEN", () => {
        expect(authReducer(initState, resetToken())).toEqual({
            ...initState,
            token: "",
            user: "",
        });
    });
});
