import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const userLogin = async (credential) => {
    return await axios
        .post(`${apiUrl}/login`, { credential })
        .then((response) => {
            return response.data;
        });
};

export const userSignUp = async (credential) => {
    return await axios
        .post(`${apiUrl}/register`, { credential })
        .then((response) => {
            return response.data;
        });
};

export const getPlaylist = async (id) => {
    return await axios.get(`${apiUrl}/playlist/${id}`).then((response) => {
        return response.data;
    });
};

export const addPlaylist = async (name, creator) => {
    return await axios
        .post(`${apiUrl}/playlist`, { name, creator })
        .then((response) => {
            return response.data;
        });
};
