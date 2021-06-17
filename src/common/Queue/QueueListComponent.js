/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Draggable } from "react-beautiful-dnd";

const queueListStyle = css`
    padding: 3% 4%;
    display: grid;
    grid-template-columns: 1fr 3em 25px;
    grid-template-rows: 1fr 1fr;

    &:hover {
        background-color: var(--primary-color);
    }

    & > .title {
        width: 90%;
        white-space: nowrap;
        overflow: hidden !important;
    }

    & > .album {
        font-size: 0.8em;
        grid-row: 2;
        width: 90%;
        white-space: nowrap;
        overflow: hidden !important;
    }

    & > .duration {
        display: flex;
        align-self: center;
        grid-row: 1/3;
        grid-column: 2;
    }

    & .removeButton {
        width: 25px;
        height: 25px;
        grid-row: 1/3;
        grid-column: 3;
        cursor: pointer;
        display: flex;
        align-self: center;
    }
`;

const queueListActive = css`
    background-color: black;
    color: var(--contrast-color);
`;

const queueListDraggingStyle = css`
    background-color: var(--thirtiary-color);
    color: var(--primary-color);
`;

export const QueueListComponent = ({ data, playingSong }) => {
    return data.map((q, i) => {
        return (
            <Draggable key={q.songId} draggableId={q.songId} index={i}>
                {(provided, snapshot) => (
                    <div
                        id={q.songId}
                        css={
                            (playingSong === q.songId ? queueListActive : "",
                            snapshot.isDragging ? queueListDraggingStyle : "")
                        }
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        datakey={q.songId}
                        onClick={(e) => skipQueue(e)}
                        onContextMenu={(e) => {
                            removeQueue(e);
                        }}
                    >
                        <li css={queueListStyle}>
                            <div className="title">{q.title}</div>
                            <div className="album">{q.albumname}</div>
                            <div
                                className={"removeButton"}
                                datakey={q.songId}
                                onClick={(e) => removeQueue(e)}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                                    />
                                </svg>
                            </div>
                            <div className="duration">
                                {" "}
                                {(q.duration / 60 < 10 ? "0" : "") +
                                    Math.floor(q.duration / 60)}{" "}
                                :{" "}
                                {(q.duration % 60 < 10 ? "0" : "") +
                                    Math.floor(q.duration % 60)}
                            </div>
                        </li>
                    </div>
                )}
            </Draggable>
        );
    });
};
