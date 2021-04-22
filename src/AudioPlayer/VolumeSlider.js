import Slider from './Slider'

export default function VolumeSlider(props){
    const { volume, setVolume } = props
    return (
        <div className="player-volume">
            <Slider onChange={(e) => setVolume(e.target.value/100)} transform={volume*100-100}/>
        </div>
    )
}

//onClick={(e) => setVolume((e.clientX-e.nativeEvent.path[0].offsetLeft)/e.nativeEvent.path[0].offsetWidth)}