const initState = {
    token: localStorage.getItem("TOKEN"),
    user: "",
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            localStorage.setItem("TOKEN", action.token);
            return {
                ...state,
                token: action.token,
                user: action.user,
            };
        case "RESET_TOKEN":
            localStorage.setItem("TOKEN", "");
            return {
                ...state,
                token: "",
            };
        default:
            return state;
    }
};
