export default function Slider({onChange, transform}){
    return(
        <div className="slider" >
            <div style={{width: '100%', height: '100%', backgroundColor: 'green', transform: `translateX(${transform}%)`}}/>
            <input type='range' style={{width: '100%', height: '100%'}} onChange={(e) => onChange(e)}/>
        </div>
    )
}