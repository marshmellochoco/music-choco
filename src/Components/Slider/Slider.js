// component import
import "./Slider.css";

export const Slider = ({ onChange, transform }) => {
    return (
        <div className="slider">
            <div
                className="slider-front"
                style={{ transform: `translateX(${transform}%)` }}
            />
            <input
                className="slider-back"
                type="range"
                onChange={(e) => onChange(e)}
            />
        </div>
    );
};
