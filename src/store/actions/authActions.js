export const setToken = (token, user) => {
    return {
        type: "SET_TOKEN",
        token,
        user,
    };
};
export const resetToken = () => {
    return {
        type: "RESET_TOKEN",
    };
};
