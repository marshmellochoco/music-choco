import { Slider } from "./Slider";
import './Player.css';
import { useState, useEffect, useCallback } from "react";

export const Player = () => {
    const {
        curTime,
        duration,
        playing,
        volume,
        ended,
        setPlaying,
        setClickedTime,
        setVolume,
        setEnded
    } = AudioPlayer();

    var [previous, setPrevious] = useState([]);
    var [lastVolume, setLastVolume] = useState(volume);

    var [queue, setQueue] = useState([
        {
            icon: 'https://i.scdn.co/image/ab67616d00004851bd5899a4711f4604447166c3',
            title: 'TITLE1',
            artist: '1',
            song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        {
            icon: 'https://i.scdn.co/image/ab67616d00004851b14cc7a53002e8df68f9a18c',
            title: 'TITLE2',
            artist: '2',
            song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        },
        {
            icon: 'https://cdn.datta.store/auxapi/files/image/cute-cat-kitty-head-kawaii.png',
            title: 'TITLE3',
            artist: '3',
            song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
        },
    ]);

    const nextSong = useCallback(
        () => {
        if (queue.length <= 1)
            return;
        setPrevious([queue[0], ...previous]);
        setQueue(queue.slice(1,queue.length));
        setEnded(false);
        }, [previous, queue, setEnded]
    );

    const prevSong = () => {
        if (previous.length < 1) {
            setClickedTime(0);
            return;
        }
        setQueue([previous[0], ...queue]);
        setPrevious(previous.slice(1,previous.length));
    };

    const handleKeyDown = (e) => {
        if (e.shiftKey){
            switch(e.key){
                case 'N': 
                    nextSong(); 
                    break;
                case 'P': 
                    prevSong(); 
                    break;
                default: 
                    return;
            }
        }
        switch(e.key){
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
                return;
        }
    };

    useEffect(() => {
        if (ended === true){
            nextSong()
            setPlaying(false)
            setPlaying(true)
        }
    }, [curTime, ended, setPlaying, nextSong]);

    const formatTime = (seconds, align) => {
        var min = parseInt(Math.floor(seconds/60),10) || 0;
        var sec = Math.floor(seconds%60);
        return (
            <div className="player-time" style={{textAlign: align}}>{(min < 10 ? '0' : '')+ min} : {(sec < 10 ? '0' : '')+ sec}</div>
        )
    };

    return (
        <div className='player' onKeyDown={(e) => handleKeyDown(e)} tabIndex="0">
            <div>
                <audio id='audio-player' src={queue[0].song}/>
                <div className='player-container'>
                    <div className="player-playing">
                        <div className="icon"><img src={queue[0].icon} alt=""/></div>
                        <div className="title">{queue[0].title}</div>
                        <div className="artist">{queue[0].artist}</div>
                    </div>
                    
                    <div className="player-control">
                        <svg xmlns="http://www.w3.org/2000/svg" className="control-button" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => prevSong()}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        {playing ?
                            <svg onClick={() => setPlaying(false)} xmlns="http://www.w3.org/2000/svg" className="control-button play" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>:
                            <svg onClick={() => setPlaying(true)} xmlns="http://www.w3.org/2000/svg" className="control-button play" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        <svg xmlns="http://www.w3.org/2000/svg" className="control-button" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => nextSong()}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    </div>
                    
                    <div className="player-volume">
                        {volume === 0 ? 
                        <svg className="volume-icon" onClick={() => {setVolume(lastVolume); }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>:
                        <svg className="volume-icon" onClick={() => {setLastVolume(volume); setVolume(0);}} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                        }
                        <Slider onChange={(e) => setVolume(e.target.value/100)} transform={volume*100-100}/>
                    </div>
                    
                    <div className="player-timeline">
                        {formatTime(curTime, "right")}
                        <Slider onChange={(e) => setClickedTime(e.target.value/100*duration)} transform={((curTime / duration) * 100)-100}/>
                        {formatTime(duration, "left")}
                    </div>
                </div>
            </div>
        </div>
    )
}

const AudioPlayer = () => {
    const [duration, setDuration] = useState()
    const [curTime, setCurTime] = useState()
    const [volume, setVolume] = useState()
    const [clickedTime, setClickedTime] = useState()
    const [playing, setPlaying] = useState(false)
    const [ended, setEnded] = useState(false)

    useEffect(() => {
        const audio = document.getElementById('audio-player')

        const setAudioData = () => {
            setDuration(audio.duration)
            setCurTime(audio.currentTime)
            setVolume(audio.volume)
        }

        const setAudioTime = () => setCurTime(audio.currentTime)
        const setAudioVolume = () => setVolume(audio.volume)
        const setAudioEnded = () => setEnded(curTime === duration && playing)

        audio.addEventListener("loadeddata", setAudioData)
        audio.addEventListener("timeupdate", setAudioTime)
        audio.addEventListener("volumechange", setAudioVolume)
        audio.addEventListener("ended", setAudioEnded())

        playing ? audio.play() : audio.pause()

        if (clickedTime != null && clickedTime !== curTime) {
            audio.currentTime = clickedTime
            setClickedTime(null)
        }

        if (volume && volume !== audio.volume)
            audio.volume = volume 

        return () => {
            audio.removeEventListener("loadeddata", setAudioData)
            audio.removeEventListener("timeupdate", setAudioTime)
            audio.removeEventListener("volumechange", setAudioVolume)
            audio.removeEventListener("ended", setAudioEnded)
        }
    }, [playing, clickedTime, curTime, volume, duration])

    return {
        curTime,
        duration,
        playing,
        volume,
        ended,
        setPlaying,
        setClickedTime,
        setVolume,
        setEnded
    }
}