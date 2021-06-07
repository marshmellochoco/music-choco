const initState = {
    token: localStorage.getItem("TOKEN"),
    user: localStorage.getItem("UID"),
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            localStorage.setItem("TOKEN", action.token);
            localStorage.setItem("UID", action.user);
            return {
                ...state,
                token: action.token,
                user: action.user,
            };
        case "RESET_TOKEN":
            localStorage.setItem("TOKEN", "");
            localStorage.setItem("UID", "");
            return {
                ...state,
                token: "",
                user: "",
            };
        default:
            return state;
    }
};
