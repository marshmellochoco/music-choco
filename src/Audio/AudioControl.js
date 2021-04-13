export default function AudioControl(props){
    const { playing, setPlaying } = props
    return(
        <div>
            <button>Prev</button>
            {playing ?
                <button onClick={() => setPlaying(false)}>Pause</button> :
                <button onClick={() => setPlaying(true)}>Play</button>
            }
            <button>Next</button>
        </div>
    )
}