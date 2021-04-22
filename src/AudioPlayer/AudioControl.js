export default function AudioControl(props){
    const { playing, setPlaying, next, prev } = props


    return(
        <div className="player-control">
            <svg xmlns="http://www.w3.org/2000/svg" className="control-button" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => prev()}>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="control-button" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => next()}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
        </div>
    )
}