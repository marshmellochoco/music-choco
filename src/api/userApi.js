import axios from "axios";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
const apiUrl = process.env.REACT_APP_API_URL;

export const userLogin = async (credential) => {
    let { email, password } = credential;
    let encrPassword = Base64.stringify(sha256(process.env.SALT + password));
    return await axios
        .post(`${apiUrl}/login`, {
            credential: { email, password: encrPassword },
        })
        .then((res) => {
            return res.data;
        });
};

export const userSignUp = async (credential) => {
    let { email, password } = credential;
    let encrPassword = Base64.stringify(sha256(process.env.SALT + password));
    return await axios
        .post(`${apiUrl}/register`, {
            credential: { email, password: encrPassword },
        })
        .then((res) => {
            return res.data;
        });
};

export const addPlaylist = async (playlist) => {
    return await axios.post(`${apiUrl}/playlist/`, playlist).then((res) => {
        return res.data;
    });
};

export const addPlaylistTrack = async (playlist) => {
    return await axios
        .put(`${apiUrl}/playlist/${playlist._id}`, { tracks: playlist.tracks })
        .then((res) => {
            return res.data;
        });
};

export const updatePlaylist = async (id, name, image) => {
    return await axios
        .put(`${apiUrl}/playlist/${id}`, { name, image })
        .then((res) => {
            return res.data;
        });
};

export const deletePlaylist = async (id) => {
    return await axios.delete(`${apiUrl}/playlist/${id}`).then((res) => {
        return res.data;
    });
};

export const addFavArtist = async (items, id) => {
    let a = items.map((a) => a._id);
    let artists = a.includes(id) ? a : [...a, id];
    return await axios
        .put(`${apiUrl}/library/artist/`, { artists })
        .then((res) => {
            return res.data;
        });
};

export const removeFavArtist = async (items, id) => {
    let artists = items.map((a) => a._id).filter((a) => a !== id);
    return await axios
        .put(`${apiUrl}/library/artist/`, { artists })
        .then((res) => {
            return res.data;
        });
};

export const addFavAlbum = async (items, id) => {
    let a = items.map((a) => a._id);
    let albums = a.includes(id) ? a : [...a, id];
    return await axios
        .put(`${apiUrl}/library/album/`, { albums })
        .then((res) => {
            return res.data;
        });
};

export const removeFavAlbum = async (items, id) => {
    let albums = items.map((a) => a._id).filter((a) => a !== id);
    return await axios
        .put(`${apiUrl}/library/album/`, { albums })
        .then((res) => {
            return res.data;
        });
};
