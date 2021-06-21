/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ReactPlayer from "react-player";
import Icon from "@mdi/react";
import {
    mdiArchive,
    mdiPauseCircleOutline,
    mdiPlayCircleOutline,
    mdiSkipNext,
    mdiSkipPrevious,
    mdiVolumeHigh,
    mdiVolumeMute,
} from "@mdi/js";

export const AudioPlayerComponent = (props) => {
    // styles
    const playerStyle = css`
        font-size: 0.8em;
        width: 98%;
        padding: 10px 1%;
        background-color: #303030;
        color: #d0d0d0;
        overflow: hidden;
        position: absolute;
        bottom: 0;

        &:focus {
            outline: none;
        }
    `;

    const playerDetailStyle = css`
        display: grid;
        grid-template-columns: minmax(2rem, 1fr) minmax(4rem, 2fr) minmax(
                2rem,
                0.8fr
            );
        grid-template-rows: 1fr 1fr;
    `;

    // markdown
    return (
        <div css={playerStyle}>
            <ReactPlayer
                width="0"
                height="0"
                // ref={ref}
                loop={false}
                url={props.songUrl}
                playing={props.playing}
                volume={props.volume}
                onStart={() => props.setCurrentTime(0)}
                onProgress={(e) => props.onProgress(e.playedSeconds)}
                onEnded={props.onEnded}
            />
            <div css={playerDetailStyle}>
                {playerPlayingDetail({
                    songData: props.songData,
                    albumUrl: props.albumUrl,
                })}
                {playerControl({
                    playing: props.playing,
                    nextSong: props.nextSong,
                    prevSong: props.prevSong,
                    playPause: props.playPause,
                })}
                {playerVolume({
                    volume: props.volume,
                    lastVolume: props.lastVolume,
                    changeVolume: props.changeVolume,
                    toggleQueue: props.toggleQueue,
                })}
                {playerTimeline({
                    currentTime: props.currentTime,
                    duration: props.songData.duration,
                    setClickedTime: props.setClickedTime,
                })}
            </div>
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

const playerPlayingDetail = ({ songData, albumUrl }) => {
    // styles
    const playerPlayingStyle = css`
        margin: auto 0;
        grid-row: 1/3;
        text-align: left;
        display: grid;
        grid-template-columns: 64px 1fr;
        grid-template-rows: 1fr 1fr;
        @media (max-width: 768px) {
            display: flex;
            flex-direction: column;
        }
    `;

    const playerIconStyle = css`
        grid-row: 1/3;
        width: 64px;
        height: 64px;

        & > img {
            max-width: 64px;
            max-height: 64px;
            background-color: white;
        }

        @media (max-width: 768px) {
            display: none;
        }
    `;

    const playerTitleStyle = css`
        font-size: 1.2em;
        margin: 0 10px;
        display: flex;
        align-items: flex-end;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
    `;

    const playerArtistStyle = css`
        font-size: 1em;
        margin: 0 10px;
        display: flex;
        align-items: flex-start;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
    `;

    // markdown
    return (
        <div css={playerPlayingStyle}>
            <div css={playerIconStyle}>
                <img src={albumUrl} />
            </div>
            <div css={playerTitleStyle}>
                {songData && songData.songId ? songData.title : "---"}
            </div>
            <div css={playerArtistStyle}>
                {songData && songData.songId ? songData.artist : "---"}
            </div>
        </div>
    );
};

const playerControl = ({ playing, playPause, nextSong, prevSong }) => {
    // styles
    const playerControlStyle = css`
        text-align: center;

        & > svg {
            height: 100%;
            margin: auto;
            width: 1.8em;
            margin: 0px 12px;
            cursor: pointer;

            &:hover {
                opacity: 0.7;
            }
        }

        & > .play {
            width: 2.5em;
        }
    `;

    // markdown
    return (
        <div css={playerControlStyle}>
            <Icon path={mdiSkipPrevious} onClick={prevSong} />
            {playing ? (
                <Icon
                    path={mdiPauseCircleOutline}
                    className="play"
                    onClick={() => playPause(false)}
                />
            ) : (
                <Icon
                    path={mdiPlayCircleOutline}
                    className="play"
                    onClick={() => playPause(true)}
                />
            )}
            <Icon path={mdiSkipNext} onClick={nextSong} />
        </div>
    );
};

const playerVolume = ({ volume, lastVolume, changeVolume, toggleQueue }) => {
    // styles
    const playerVolumeStyle = css`
        display: flex;
        justify-content: flex-end;
        grid-row: 1/3;
        grid-column: 3;

        & svg {
            padding: 4px;
            width: 1.8em;
            cursor: pointer;
            margin: 0 10px;

            &:hover {
                opacity: 0.7;
            }
        }

        & > div {
            display: flex;
            & > div {
                @media (max-width: 768px) {
                    display: none;
                }
            }
        }
    `;

    // markdown
    return (
        <div css={playerVolumeStyle}>
            <div>
                <Icon path={mdiArchive} onClick={toggleQueue} />
            </div>

            <div>
                {volume === 0 ? (
                    <Icon
                        path={mdiVolumeMute}
                        onClick={() => changeVolume(lastVolume)}
                    />
                ) : (
                    <Icon
                        path={mdiVolumeHigh}
                        onClick={() => changeVolume(0)}
                    />
                )}

                <Slider
                    onChange={(value) => {
                        changeVolume(value / 100);
                    }}
                    transform={volume * 100 - 100}
                />
            </div>
        </div>
    );
};

const playerTimeline = ({ currentTime, duration, setClickedTime }) => {
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
                onChange={setClickedTime}
                transform={(currentTime / duration) * 100 - 100}
            />

            <div>{getTime(duration)}</div>
        </div>
    );
};
