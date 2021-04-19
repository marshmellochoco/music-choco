import AudioTimeline from './PlayerTimeline';
import VolumeSlider from './VolumeSlider';
import AudioControl from './PlayerControl';
import './AudioPlayer.css';
import AudioPlaying from './NowPlaying';
import { useState, useEffect } from "react";

export default function Audio() {
    const {
        curTime,
        duration,
        playing,
        volume,
        setPlaying,
        setClickedTime,
        setVolume
    } = AudioPlayer();

    const song1 = {
        icon: 'https://i.scdn.co/image/ab67616d00004851bd5899a4711f4604447166c3',
        title: 'TITLE',
        artist: 'ARTIST',
        song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    };


    function handleKeyDown(key){
        switch(key){
            case 'ArrowLeft':
                setClickedTime(curTime - 5);
                break;
            case 'ArrowRight':
                setClickedTime(curTime + 5);
                break;
            case 'ArrowDown':
                setVolume(volume > 0.1 ? volume - 0.1 : 0);
                break;
            case 'ArrowUp':
                setVolume(volume < 0.9 ? volume + 0.1 : 1);
                break;
            case ' ':
                setPlaying(!playing);
                break;
            default:
                return
        }
    }

    return (
        <div className='player' onKeyDown={(e) => handleKeyDown(e.key)}>
            <audio id='audio-player' src={song1.song}/>
            <div className='player-container'>
                <AudioPlaying icon={song1.icon} title={song1.title} artist={song1.artist}/>
                <AudioControl playing={playing} setPlaying={setPlaying}/>
                <VolumeSlider volume={volume} setVolume={(volume) => setVolume(volume)}/>
                <AudioTimeline duration={duration} curTime={curTime}/>
            </div>
        </div>
    )
}

function AudioPlayer() {
    const [duration, setDuration] = useState()
    const [curTime, setCurTime] = useState()
    const [volume, setVolume] = useState()
    const [clickedTime, setClickedTime] = useState()
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        const audio = document.getElementById('audio-player')

        const setAudioData = () => {
            setDuration(audio.duration)
            setCurTime(audio.currentTime)
            setVolume(audio.volume)
        }

        const setAudioTime = () => setCurTime(audio.currentTime)
        const setAudioVolume = () => setVolume(audio.volume)

        audio.addEventListener("loadeddata", setAudioData)
        audio.addEventListener("timeupdate", setAudioTime)
        audio.addEventListener("volumechange", setAudioVolume)

        playing ? audio.play() : audio.pause()

        if (clickedTime && clickedTime !== curTime) {
            audio.currentTime = clickedTime
            setClickedTime(null);
        }

        if (volume && volume !== audio.volume)
            audio.volume = volume; 

        return () => {
            audio.removeEventListener("loadeddata", setAudioData)
            audio.removeEventListener("timeupdate", setAudioTime)
            audio.removeEventListener("volumechange", setAudioVolume)
        }
    }, [playing, clickedTime, curTime, volume])

    return {
        curTime,
        duration,
        playing,
        volume,
        setPlaying,
        setClickedTime,
        setVolume
    }
}