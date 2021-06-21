/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import { Link } from "react-router-dom";

export const AlbumPageComponent = ({
    playingSong,
    album,
    artist,
    albumImg,
    errorImg,
    songs,
    setAlbumToQueue,
    setSong,
    addQueue,
}) => {
    // styles
    const albumStyle = css`
        & > a {
            display: flex;
            align-items: center;
            width: min-content;
            text-decoration: none;
            font-size: 1.2em;
            margin: 1em 0;
            font-weight: bold;
            color: var(--contrast-color);
            & > svg {
                padding: 0 1rem;
                width: 1em;
                height: 100%;
            }
        }
        & > a:hover {
            text-decoration: underline;
        }
    `;

    const albumHeader = css`
        margin: 1rem 0 2rem 0;
        display: grid;
        grid-template-columns: 13rem 1fr;
        img {
            width: 12rem;
            cursor: pointer;
            opacity: 1;
            background-color: white;
        }

        img:hover {
            opacity: 0.7;
        }

        .album {
            display: inline-block;
            align-self: flex-end;
        }
    `;

    const albumListStyle = css`
        list-style-type: none;
        padding: 0;
        margin-right: 1rem;

        & > li {
            padding: 0.8em 0;
            padding-left: 1rem;
            display: grid;
            grid-template-columns: 4rem minmax(0, 1fr) 4rem 5rem;
        }
        & > hr {
            margin: 0;
            border: 1px solid var(--secondary-color);
        }

        & .activeItem {
            background-color: var(--thirtiary-color);
            color: var(--primary-color);
        }
    `;

    const albumListHeaderStyle = css`
        font-size: 0.8em;
    `;

    const albumListItemStyle = css`
        background-color: var(--primary-color);

        & .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
        }

        &:hover {
            background-color: var(--secondary-color);
        }

        div {
            display: flex;
            align-items: center;
        }

        .icon {
            fill: transparent;
            margin: auto;
            width: 2em;
        }
    `;

    // markdown
    const songList = ({ songs, setSong, addQueue }) => {
        return songs.map((s, i) => (
            <li
                css={albumListItemStyle}
                className={`${playingSong === s._id ? "activeItem" : ""}`}
                key={s._id}
                onClick={() => setSong(s._id)}
                onContextMenu={() => addQueue(s._id)}
            >
                <div>{i + 1}</div>
                <div className="title">{s.title}</div>
                <div className="icon" onClick={() => addQueue(s._id)}>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                    </svg>
                </div>
                <div>
                    {(s.duration / 60 < 10 ? "0" : "") +
                        Math.floor(s.duration / 60)}{" "}
                    : {(s.duration % 60 < 10 ? "0" : "") + (s.duration % 60)}
                </div>
            </li>
        ));
    };

    return (
        <div css={albumStyle}>
            <Link to="/">
                <Icon path={mdiArrowLeft} /> Back
            </Link>
            <div css={albumHeader}>
                <img
                    alt={album}
                    src={albumImg}
                    onClick={() => setAlbumToQueue()}
                    onError={(e) => (e.target.src = errorImg)}
                />

                <div className="album">
                    <h1>{album}</h1>
                    <h2>{artist}</h2>
                </div>
            </div>
            <ul css={albumListStyle}>
                <li css={albumListHeaderStyle}>
                    <div>#</div>
                    <div className="title">Title</div>
                    <div />
                    <div>Duration</div>
                </li>
                <hr />
                {songList({ songs, setSong: setSong, addQueue: addQueue })}
            </ul>
        </div>
    );
};
