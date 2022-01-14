import axios from "axios";

const getToken = () => {
    let token = localStorage.getItem("t");
    if (token !== null) axios.defaults.headers.common["Authorization"] = token;
    return token;
};

const getUser = () => {
    let u = localStorage.getItem("u");
    return u ? JSON.parse(u) : { displayName: "", uid: "" };
};

const initState = {
    ...getUser(),
    token: getToken() !== null ? getToken() : null,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            localStorage.setItem("t", action.token);
            axios.defaults.headers.common["Authorization"] = action.token;
            return { ...state, token: action.token };
        case "LOGOUT":
            localStorage.removeItem("t");
            localStorage.removeItem("u");
            return { ...state, token: null, displayName: "", uid: "" };
        case "SET_USER":
            let user = { displayName: action.displayName, uid: action.uid };
            localStorage.setItem("u", JSON.stringify(user));
            return {
                ...state,
                ...user,
            };
        default:
            return state;
    }
};

export default userReducer;
