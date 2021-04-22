import AudioTimeline from './PlayerTimeline'
import VolumeSlider from './VolumeSlider'
import AudioControl from './AudioControl'
import './AudioPlayer.css'
import AudioPlaying from './AudioPlaying'
import { useState, useEffect, useCallback } from "react"

export default function Audio() {
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
    } = AudioPlayer()

    var [previous, setPrevious] = useState([])

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
        {
            icon: 'https://cdn.datta.store/auxapi/files/image/cute-wolf-head-kawaii.png',
            title: 'TITLE4',
            artist: '4',
            song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
        },
        {
            icon: 'https://cdn.datta.store/auxapi/files/image/cute-lion-head-kawaii.png',
            title: 'TITLE5',
            artist: '5',
            song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
        },
        {
            icon: 'https://cdn.datta.store/auxapi/files/image/cute-cat-kitty-head-kawaii.png',
            title: '6',
            artist: '6',
            song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
        },
        {
            icon: 'https://cdn.datta.store/auxapi/files/image/cute-wolf-head-kawaii.png',
            title: '7',
            artist: '7',
            song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
        },
        {
            icon: 'https://cdn.datta.store/auxapi/files/image/cute-lion-head-kawaii.png',
            title: '8',
            artist: '8',
            song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
        },
    ])

    const nextSong = useCallback(
        () => {
            if (queue.length <= 1)
            return
        setPrevious([queue[0], ...previous])
        setQueue(queue.slice(1,queue.length))
        setEnded(false)
        }, [previous, queue, setEnded]
    )

    function prevSong() {
        if (previous.length < 1) {
            setClickedTime(0)
            return
        }
        setQueue([previous[0], ...queue])
        setPrevious(previous.slice(1,previous.length))
    }

    function handleKeyDown(e){
        console.log(e)
        if (e.shiftKey){
            switch(e.key){
                case 'N': nextSong(); break;
                case 'P': prevSong(); break;
                default: return;
            }
        }
        switch(e.key){
            case 'ArrowLeft':
                setClickedTime(curTime - 5)
                break
            case 'ArrowRight':
                setClickedTime(curTime + 5)
                break
            case 'ArrowDown':
                setVolume(volume > 0.1 ? volume - 0.1 : 0)
                break
            case 'ArrowUp':
                setVolume(volume < 0.9 ? volume + 0.1 : 1)
                break
            case ' ':
                setPlaying(!playing)
                break
            default:
                return
        }
    }

    useEffect(() => {
        if (ended === true){
            nextSong()
            setPlaying(false)
            setPlaying(true)
        }
    }, [curTime, ended, setPlaying, nextSong])

    return (
        <div className='player' onKeyDown={(e) => handleKeyDown(e)} tabIndex="0">
            <div>
                <audio id='audio-player' src={queue[0].song}/>
                <div className='player-container'>
                    <AudioPlaying icon={queue[0].icon} title={queue[0].title} artist={queue[0].artist}/>
                    <AudioControl playing={playing} setPlaying={setPlaying} next={nextSong} prev={prevSong}/>
                    <VolumeSlider volume={volume} setVolume={(volume) => setVolume(volume)}/>
                    <AudioTimeline duration={duration} curTime={curTime} setClickedTime={setClickedTime}/>
                </div>
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