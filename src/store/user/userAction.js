export const setToken = (token) => {
    return {
        type: "SET_TOKEN",
        token,
    };
};

export const setUser = (uid, displayName) => {
    return {
        type: "SET_USER",
        uid,
        displayName,
    };
};

export const logoutAction = () => {
    return {
        type: "LOGOUT",
    };
};
