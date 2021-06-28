import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const DeleteSong = ({ albumID }) => {
	const apiUrl = process.env.REACT_APP_API_URL;
	const [songList, setSongList] = useState([]);
	useEffect(() => {
		axios
			.get(`${apiUrl}/album/${albumID}`)
			.then((res) => setSongList(res.data.songs))
			.catch((e) => console.log(e));
	}, [albumID]);

	const deleteSong = (id) => {
		axios.delete(`${apiUrl}/song/${id}`).catch((err) => {
			console.log(err);
		});
	};

	const getSongList = () => {
		return songList.map((song) => {
			return (
				<li key={song._id} onClick={() => deleteSong(song._id)}>
					<Link>{song.title}</Link>
				</li>
			);
		});
	};
	return (
		<div>
			<h1>Delete Song</h1>
			<ul>{getSongList()}</ul>
		</div>
	);
};
