export const setToken = (token) => {
    return {
        type: "SET_TOKEN",
        token,
    };
};

export const setUser = (user) => {
    return {
        type: "SET_USER",
        user,
    };
};

export const logoutAction = () => {
    return {
        type: "LOGOUT",
    };
};
