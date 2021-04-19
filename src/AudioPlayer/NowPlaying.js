export default function AudioPlaying({ icon, title, artist}) {
    return(
        <div className="player-title">
        <div className="icon"><img src={icon} alt=""/></div>
        <div className="title">{title}</div>
        <div className="artist">{artist}</div>
    </div>
    )
}