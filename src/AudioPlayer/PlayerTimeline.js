import Slider from "./Slider";

export default function AudioTimeline(props) {
    const { duration, curTime, setClickedTime } = props;
    const curPercentage = (curTime / duration) * 100;

    function formatTime(seconds, align){
        var min = parseInt(Math.floor(seconds/60),10) || 0
        var sec = Math.floor(seconds%60)
        return (
            <div className="player-time" style={{textAlign: align}}>{(min < 10 ? '0' : '')+ min} : {(sec < 10 ? '0' : '')+ sec}</div>
        )
    }

    return (
        <div className="player-timeline">
            {formatTime(curTime, "right")}
            <Slider onChange={(e) => setClickedTime(e.target.value/100*duration)} transform={curPercentage-100}/>
            {formatTime(duration, "left")}
        </div>
    )
}


 //value={curPercentage} className="timeline" onChange={e => e.value=curTime}