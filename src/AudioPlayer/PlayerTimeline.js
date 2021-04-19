export default function AudioTimeline(props) {
    const { duration, curTime } = props;
    const curPercentage = (curTime / duration) * 100;

    function formatTime(seconds){
        var min = parseInt(Math.floor(seconds/60),10) || 0
        var sec = Math.floor(seconds%60)
        return (
            <span className="player-time">{(min < 10 ? '0' : '')+ min} : {(sec < 10 ? '0' : '')+ sec}</span>
        )
    }

    return (
        <div className="player-timeline">
            {formatTime(curTime)}
            <input type="range" className="timeline" value={curPercentage} onChange={e => e.value=curTime}/>
            {formatTime(duration)}
        </div>
    )
}
