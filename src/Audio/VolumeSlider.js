export default function VolumeSlider(props){
    const { volume, setVolume } = props
    return (
        <div>
            <input defaultValue='100' type="range" value={volume*100} className="volume" onChange={(e) => setVolume((e.target.value/100).toFixed(2))}/>
            <span>{Math.floor(volume*100)}%</span>
        </div>
    )
}