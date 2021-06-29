import { AlbumPageComponent } from './AlbumPageComponent';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setPlayingSong } from '../../store/actions/songDataAction';
import { addQueue, setQueue } from '../../store/actions/queueAction';
import { setPlaying } from '../../store/actions/playerActions';

export const AlbumPageContainer = () => {
	const apiUrl = process.env.REACT_APP_API_URL;
	const [songs, setSongs] = useState([]);
	const [album, setAlbum] = useState('');
	const [artist, setArtist] = useState('');

	const songList = [];
	let { id } = useParams();

	const authToken = useSelector((state) => state.authReducer.token);
	const playingSong = useSelector((state) => state.songDataReducer.songData.songId);
	const queue = useSelector((state) => state.queueReducer.queue);
	const dispatch = useDispatch();

	useEffect(() => {
		axios.get(`${apiUrl}/album/${id}`).then((res) => {
			setAlbum(res.data.albumname);
			setArtist(res.data.artist);
		});

		axios
			.get(`${apiUrl}/album/${id}`)
			.then((res) => setSongs(res.data.songs))
			.catch((e) => console.log(e));
	}, [id, apiUrl]);

	const setSong = async (id) => {
		// play the selected song and add it to the queue
		dispatch(addQueue(id));
		dispatch(setPlayingSong(id, authToken));
		dispatch(setPlaying(true));
	};

	const setAlbumToQueue = async () => {
		// play the entier album and replace the existing queue
		dispatch(setQueue(songList));
		dispatch(setPlayingSong(songList[0], authToken));
		dispatch(setPlaying(true));
	};

	const addToQueue = (id) => {
		// add the song to the queue
		if (queue.length === 0) dispatch(setPlayingSong(id, authToken));
		dispatch(addQueue(id));
	};

	return (
		<AlbumPageComponent
			playingSong={playingSong}
			album={album}
			artist={artist}
			albumImg={`${apiUrl}/album/ico/${id}`}
			errorImg={'https://f4.bcbits.com/img/a4139357031_10.jpg'}
			songs={songs}
			setAlbumToQueue={setAlbumToQueue}
			setSong={setSong}
			addQueue={addToQueue}
		/>
	);
};
