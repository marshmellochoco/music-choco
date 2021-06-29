import axios from 'axios';

export const setSongData = (songData) => {
	return {
		type: 'SET_SONG_DATA',
		songData,
	};
};

export const setPlayingSong = (songId, authToken) => {
	axios
		.post(
			`${process.env.REACT_APP_API_URL}/user/playing/`,
			{ songId },
			{ headers: { Authorization: authToken } }
		)
		.then((result) => console.log(result));
	return {
		type: 'SET_PLAYING_SONG',
		songId,
	};
};
