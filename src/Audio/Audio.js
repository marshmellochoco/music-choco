import AudioTimeline from './AudioTimeline'
import VolumeSlider from './VolumeSlider'
import AudioPlayer from './AudioPlayer'
import AudioControl from './AudioControl'

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
            <audio id='audio-player' src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'/>
            <div className='controls'>
                <AudioTimeline duration={duration} curTime={curTime}/>
                <AudioControl playing={playing} setPlaying={setPlaying}/>
                <VolumeSlider volume={volume} setVolume={(volume) => setVolume(volume)}/>
            </div>
        </div>
    )
}