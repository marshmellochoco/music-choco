const initState = {
    token: localStorage.getItem("TOKEN"),
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            localStorage.setItem("TOKEN", state.token);
            return {
                token: action.token,
            };
        case "RESET_TOKEN":
            localStorage.setItem("TOKEN", null);
            return {
                token: "",
            };
        default:
            return state;
    }
};
