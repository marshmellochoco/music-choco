import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getArtist = async (artistId) => {
    return await axios.get(`${apiUrl}/artist/${artistId}/`).then((response) => {
        return response.data;
    });
};

export const getArtistAlbums = async (artistId) => {
    return await axios
        .get(`${apiUrl}/artist/${artistId}/albums/`)
        .then((response) => {
            return response.data;
        });
};

export const getArtistTracks = async (artistId) => {
    return await axios
        .get(`${apiUrl}/artist/${artistId}/tracks/`)
        .then((response) => {
            return response.data;
        });
};

export const getAlbum = async (albumId) => {
    return await axios.get(`${apiUrl}/album/${albumId}/`).then((response) => {
        return response.data;
    });
};

export const getAlbumTracks = async (albumId) => {
    return await axios
        .get(`${apiUrl}/album/${albumId}/tracks/`)
        .then((response) => {
            return response.data;
        });
};

export const getTrack = async (trackId) => {
    return await axios.get(`${apiUrl}/track/${trackId}/`).then((response) => {
        return { ...response.data, url: `${apiUrl}/track/${trackId}/play` };
    });
};

export const getFeaturedArtist = async () => {
    return await axios.get(`${apiUrl}/featured-artists`).then((response) => {
        return response.data;
    });
};

export const getNewRelease = async () => {
    return await axios.get(`${apiUrl}/new-release`).then((response) => {
        return response.data;
    });
};

// TODO: if !res.ok throw error
// TODO: handle id not found error
// TODO: useEffect cleanup