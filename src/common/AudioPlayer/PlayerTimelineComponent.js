/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const PlayerTimelineComponent = ({
    currentTime,
    duration,
    setClickedTime,
}) => {
    // styles
    const playerTimelineStyle = css`
        margin: auto 0;
        text-align: center;
        display: grid;
        grid-template-columns: 4rem 10fr 4rem;
        font-size: 0.9em;
    `;

    const getTime = (time) => {
        return `${time / 60 < 10 ? "0" : ""} 
                    ${Math.floor(time / 60)}
                : ${time % 60 < 10 ? "0" : ""} ${time % 60}`;
    };

    // markdown
    return (
        <div css={playerTimelineStyle}>
            <div>{getTime(currentTime)}</div>

            <Slider
                // TODO: Fix seek to function
                onChange={() => {}}
                transform={(currentTime / duration) * 100 - 100}
            />

            <div>{getTime(duration)}</div>
        </div>
    );
};

const Slider = ({ onChange, transform }) => {
    const sliderStyle = css`
        width: 96%;
        margin: auto 2%;
        background-color: grey;
        height: 0.3em;
        border-radius: 2px;
        overflow: hidden;
    `;

    const sliderFrontStyle = css`
        width: 100%;
        height: 100%;
        background-color: green;
    `;

    const sliderBackStyle = css`
        cursor: pointer;
        width: 100%;
        height: 100%;
        opacity: 0;
        margin: auto 0;
        float: right;
        transform: translateY(-100%);
    `;

    return (
        <div css={sliderStyle}>
            <div
                css={sliderFrontStyle}
                style={{ transform: `translateX(${transform}%)` }}
            />
            <input
                css={sliderBackStyle}
                type="range"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
