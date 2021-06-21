/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mdiDelete } from "@mdi/js";
import Icon from "@mdi/react";
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

export const QueueListComponent = ({
    data,
    playingSong,
    skipQueue,
    removeQueue,
}) => {
    return data.map((q, i) => {
        return (
            <Draggable key={q.songId} draggableId={q.songId} index={i}>
                {(provided, snapshot) => (
                    <div
                        id={q.songId}
                        className={`${
                            playingSong === q.songId
                                ? "active"
                                : snapshot.isDragging
                                ? "dragging"
                                : ""
                        }`}
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
                            <Icon
                                path={mdiDelete}
                                datakey={q.songId}
                                className={"removeButton"}
                                onClick={(e) => removeQueue(e)}
                            />
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
