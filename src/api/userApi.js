import axios from "axios";
import CryptoJS from "crypto-js";
const apiUrl = process.env.REACT_APP_API_URL;
const key = process.env.REACT_APP_PRIVATE_KEY;

// #region Auth
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
// #endregion

// #region Playlist
export const addPlaylist = async (playlist) => {
    return await axios.post(`${apiUrl}/playlists/`, playlist).then((res) => {
        return res.data;
    });
};

export const addPlaylistTrack = async (playlist, track) => {
    return await axios
        .put(`${apiUrl}/playlists/${playlist}/tracks`, { track })
        .then((res) => {
            return res.data;
        });
};

export const removePlaylistTrack = async (playlist, track) => {
    return await axios
        .delete(`${apiUrl}/playlists/${playlist}/tracks`, { data: { track } })
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

export const deletePlaylist = async (id) => {
    return await axios.delete(`${apiUrl}/playlists/${id}`).then((res) => {
        return res.data;
    });
};
// #endregion

//#region Library
export const addArtistToLibrary = async (artist) => {
    return await axios
        .put(`${apiUrl}/me/library/artists/`, { artist })
        .then((res) => {
            return res.data;
        });
};

export const removeArtistFromLibrary = async (artist) => {
    return await axios
        .delete(`${apiUrl}/me/library/artists/`, { data: { artist } })
        .then((res) => {
            return res.data;
        });
};

export const addAlbumToLibrary = async (album) => {
    return await axios
        .put(`${apiUrl}/me/library/albums/`, { album })
        .then((res) => {
            return res.data;
        });
};

export const removeAlbumFromLibrary = async (album) => {
    return await axios
        .delete(`${apiUrl}/me/library/albums/`, { data: { album } })
        .then((res) => {
            return res.data;
        });
};

export const addPlaylistToLibrary = async (playlist) => {
    return await axios
        .put(`${apiUrl}/me/library/playlists/`, { playlist })
        .then((res) => {
            return res.data;
        });
};

export const removePlaylistFromLibrary = async (playlist) => {
    return await axios
        .delete(`${apiUrl}/me/library/playlists/`, { data: { playlist } })
        .then((res) => {
            return res.data;
        });
};
//#endregion
