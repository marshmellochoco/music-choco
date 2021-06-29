import { createRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayingSong } from '../../store/actions/songDataAction';
import { setPlaying, setVolume } from '../../store/actions/playerActions';
import { toggleQueue } from '../../store/actions/queueAction';
import { AudioPlayerComponent } from './AudioPlayerComponent';
import { PlayerControlComponent } from './PlayerControlComponent';
import { PlayerDetailComponent } from './PlayerDetailComponent';
import { PlayerToolComponent } from './PlayerToolComponent';
import { PlayerTimelineComponent } from './PlayerTimelineComponent';

export const AudioPlayerContainer = () => {
	// initialization
	const apiUrl = process.env.REACT_APP_API_URL;
	const authToken = useSelector((state) => state.authReducer.token);
	const songData = useSelector((state) => state.songDataReducer.songData);
	const { queue, randomQueue } = useSelector((state) => state.queueReducer);
	const { playing, volume, loop, random } = useSelector((state) => state.playerReducer);
	const [currentTime, setCurrentTime] = useState(0);
	const [lastVolume, setLastVolume] = useState(volume);
	const dispatch = useDispatch();
	const ref = createRef();

	useEffect(() => {
		if (playing) ref.current.play();
		else ref.current.pause();
		ref.current.volume = volume;
	}, [playing, volume]);

	// functions
	// player functions
	const onProgress = (playedSeconds) => {
		// set the current time as the number of seconds played on the song
		if (Math.floor(playedSeconds) <= songData.duration) {
			setCurrentTime(Math.ceil(playedSeconds));
		}
	};

	const onEnded = () => {
		// play the next song when the current song has ended, reset the played time
		dispatch(setPlaying(false));
		setCurrentTime(0);
		nextSong();
		dispatch(setPlaying(true));
	};

	// control functions
	const setClickedTime = (percent) => {
		// seek to the partition of the song according the the percentage of timeline
		let second = (percent / 100) * songData.duration;
		ref.current.currentTime = second;
	};

	const changeVolume = (vol) => {
		// change the volume, if it is unmuted, set volume to the previous volume
		setLastVolume(volume === 0 ? lastVolume : volume);
		dispatch(setVolume(vol));
	};

	const prevSong = () => {
		// play the previous song, if no previous song, restart the song
		// if is random, use the random queue list else use the normal queue list
		if (random) {
			if (randomQueue.indexOf(songData.songId) === 0) {
				setClickedTime(0);
			} else {
				dispatch(
					setPlayingSong(randomQueue[randomQueue.indexOf(songData.songId) - 1], authToken)
				);
			}
		} else {
			if (queue.indexOf(songData.songId) === 0) {
				setClickedTime(0);
			} else {
				dispatch(setPlayingSong(queue[queue.indexOf(songData.songId) - 1], authToken));
			}
		}
	};

	const nextSong = () => {
		// play the next song, if is the last song in the list, play nothing
		// if is random, use the random queue list else use the normal queue list
		if (!songData.songId) return;

		const next = (q) => {
			if (q.indexOf(songData.songId) === q.length - 1) {
				dispatch(setPlayingSong(loop ? q[0] : '', authToken));
				if (!loop) dispatch(setPlaying(false));
			} else {
				dispatch(setPlayingSong(q[q.indexOf(songData.songId) + 1], authToken));
			}
		};

		next(random ? randomQueue : queue);
	};

	const playPause = (play) => {
		if (songData.songId) {
			dispatch(setPlaying(play));
		} else dispatch(setPlaying(false));
	};

	return (
		<>
			<audio
				src={songData.songId ? `${apiUrl}/song/play/${songData.songId}` : ''}
				ref={ref}
				onTimeUpdate={() => onProgress(ref.current.currentTime)}
				onEnded={onEnded}
				onCanPlay={() => {
					if (playing) ref.current.play();
				}}
			/>
			<AudioPlayerComponent>
				<PlayerDetailComponent
					songData={songData}
					albumUrl={
						songData && songData.songId ? `${apiUrl}/album/ico/${songData.albumId}` : ''
					}
				/>
				<PlayerControlComponent
					playing={playing}
					nextSong={nextSong}
					prevSong={prevSong}
					playPause={playPause}
				/>
				<PlayerToolComponent
					volume={volume}
					lastVolume={lastVolume}
					changeVolume={changeVolume}
					toggleQueue={() => dispatch(toggleQueue())}
				/>
				<PlayerTimelineComponent
					currentTime={currentTime}
					duration={songData.duration}
					setClickedTime={setClickedTime}
				/>
			</AudioPlayerComponent>
		</>
	);
};
