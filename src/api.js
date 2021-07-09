import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getResponse = async () => {
    return await axios.get(`${apiUrl}`);
};

//#region Auth
export const getAuth = async (token) => {
    return await axios.get(`${apiUrl}/auth`, {
        headers: { Authorization: token },
    });
};

export const authLogin = async (credentials) => {
    return await axios.post(`${apiUrl}/auth/login`, {
        credentials,
    });
};

export const authSignup = async (credentials) => {
    return await axios.post(`${apiUrl}/auth/signup`, {
        credentials,
    });
};

export const getPlaylist = async (token) => {
    return await axios.get(`${apiUrl}/user/playlist/`, {
        headers: { Authorization: token },
    });
};
//#endregion

//#region User
export const getPlaylistList = (token) => {
    return axios.get(`${apiUrl}/user/playlist/`, {
        headers: { Authorization: token },
    });
};

export const setPlaylist = (token, queue, playlistId) => {
    // TODO: Implement function
    return axios.post(
        `${apiUrl}/user/playlist/`,
        { data: queue, playlistId },
        { headers: { Authorization: token } }
    );
};

export const setUserPlaying = (token, songId) => {
    return axios.post(
        `${apiUrl}/user/playing/`,
        { songId },
        { headers: { Authorization: token } }
    );
};
//#endregion

//#region Search
export const getAlbumSearch = async (search) => {
    return await axios.get(`${apiUrl}/album/search/${search}`);
};

export const getSongSearch = async (search) => {
    return await axios.get(`${apiUrl}/song/search/${search}`);
};
//#endregion

//#region
export const getAlbum = async (albumId) => {
    return await axios.get(`${apiUrl}/album/${albumId}`);
};

export const getSong = async (songId) => {
    return await axios.get(`${apiUrl}/song/${songId}`);
};
//#endregion
