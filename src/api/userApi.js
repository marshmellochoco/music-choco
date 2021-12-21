import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const userLogin = async (credential) => {
    return await axios.post(`${apiUrl}/login`, { credential }).then((res) => {
        return res.data;
    });
};

export const userSignUp = async (credential) => {
    return await axios
        .post(`${apiUrl}/register`, { credential })
        .then((res) => {
            return res.data;
        });
};

export const addPlaylistTrack = async (playlist) => {
    return await axios
        .put(`${apiUrl}/playlist/${playlist._id}`, { playlist })
        .then((res) => {
            return res.data;
        });
};

export const addPlaylist = async (playlist) => {
    return await axios.post(`${apiUrl}/playlist/`, playlist).then((res) => {
        return res.data;
    });
};

export const addFavArtist = async (artist) => {
    return await axios
        .put(`${apiUrl}/library/artist/`, { artist })
        .then((res) => {
            return res.data;
        });
};

export const addFavAlbum = async (album) => {
    return await axios
        .put(`${apiUrl}/library/album/`, { album })
        .then((res) => {
            return res.data;
        });
};
