const initState = {
    user: "",
    token: "",
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            break;
        default:
            return state;
    }
};

export default userReducer;
