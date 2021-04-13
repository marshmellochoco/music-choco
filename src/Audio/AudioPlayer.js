import {
    useState,
    useEffect
} from "react";

export default function AudioPlayer() {
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
