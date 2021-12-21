import axios from "axios";

const getToken = () => {
    let token = localStorage.getItem("token");
    if (token !== null) axios.defaults.headers.common["Authorization"] = token;
    return localStorage.getItem("token");
};

const initState = {
    user: "",
    token: getToken() !== null ? getToken() : null,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            localStorage.setItem("token", action.token);
            return { ...state, token: action.token };
        case "LOGOUT":
            localStorage.removeItem("token");
            return { ...state, token: null };
        case "SET_USER":
            return { ...state, user: action.user };
        default:
            return state;
    }
};

export default userReducer;
