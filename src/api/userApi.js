import axios from "axios";
import CryptoJS from "crypto-js";
const apiUrl = process.env.REACT_APP_API_URL;
const key = process.env.REACT_APP_PRIVATE_KEY;

export const userLogin = async ({ email, password }) => {
    let encrPassword = CryptoJS.AES.encrypt(password, key).toString();
    return await axios
        .post(`${apiUrl}/login`, {
            credential: { email, password: encrPassword },
        })
        .then((res) => {
            return res.data;
        });
};

export const userSignUp = async ({ email, password }) => {
    let encrPassword = CryptoJS.AES.encrypt(password, key).toString();
    return await axios
        .post(`${apiUrl}/register`, {
            credential: { email, password: encrPassword },
        })
        .then((res) => {
            return res.data;
        });
};

export const addPlaylist = async (playlist) => {
    return await axios.post(`${apiUrl}/playlists/`, playlist).then((res) => {
        return res.data;
    });
};

export const addPlaylistTrack = async (playlist, track) => {
    return await axios
        .put(`${apiUrl}/playlists/${playlist}/track`, { track })
        .then((res) => {
            return res.data;
        });
};

export const updatePlaylist = async (id, name) => {
    return await axios
        .put(`${apiUrl}/playlists/${id}`, { name })
        .then((res) => {
            return res.data;
        });
};

// TODO: Review
export const deletePlaylist = async (id) => {
    return await axios.delete(`${apiUrl}/playlists/${id}`).then((res) => {
        return res.data;
    });
};

export const addArtistToLibrary = async (items, id) => {
    let a = items.map((a) => a._id);
    let artists = a.includes(id) ? a : [...a, id];
    return await axios
        .put(`${apiUrl}/library/artist/`, { artists })
        .then((res) => {
            return res.data;
        });
};

export const removeArtistFromLibrary = async (items, id) => {
    let artists = items.map((a) => a._id).filter((a) => a !== id);
    return await axios
        .put(`${apiUrl}/library/artist/`, { artists })
        .then((res) => {
            return res.data;
        });
};

export const addAlbumToLibrary = async (items, id) => {
    let a = items.map((a) => a._id);
    let albums = a.includes(id) ? a : [...a, id];
    return await axios
        .put(`${apiUrl}/library/album/`, { albums })
        .then((res) => {
            return res.data;
        });
};

export const removeAlbumFromLibrary = async (items, id) => {
    let albums = items.map((a) => a._id).filter((a) => a !== id);
    return await axios
        .put(`${apiUrl}/library/album/`, { albums })
        .then((res) => {
            return res.data;
        });
};
