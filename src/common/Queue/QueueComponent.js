/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Icon from "@mdi/react";
import { mdiShuffle, mdiSync } from "@mdi/js";
import ReactLoading from "react-loading";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const QueueComponent = ({
    isLoop,
    isRandom,
    loading,
    toggleRandom,
    toggleLoop,
    handleDragDrop,
    queueList,
}) => {
    // styles
    const queueStyle = css`
        background-color: var(--secondary-color);
        padding: 0 1rem;
        overflow-y: scroll;

        & > .loading {
            margin: auto;
        }
    `;

    const queueHeaderStyle = css`
        display: flex;
        align-items: baseline;
        align-content: flex-end;
        margin-left: auto;

        & > div {
            display: flex;
            margin-left: auto;

            & > svg {
                fill: var(--contrast-color);
                width: 2em;
                height: 2em;
                margin: 1rem;
                cursor: pointer;

                &:hover {
                    opacity: 0.7;
                }
            }

            & > .active {
                color: var(--primary-color);
            }
        }
    `;

    const queueListStyle = css`
        list-style-type: none;
        padding-left: 0;

        & .active {
            background-color: black;
            color: var(--contrast-color);
        }

        & .dragging {
            background-color: var(--thirtiary-color);
            color: var(--primary-color);
        }
    `;

    // markdown
    return (
        <div css={queueStyle}>
            <div css={queueHeaderStyle}>
                <h1>Queue</h1>
                <div>
                    <Icon
                        path={mdiShuffle}
                        className={isRandom ? "active" : ""}
                        onClick={() => toggleRandom()}
                    />
                    <Icon
                        path={mdiSync}
                        className={isLoop ? "active" : ""}
                        onClick={() => toggleLoop()}
                    />
                </div>
            </div>
            {loading ? (
                <ReactLoading className="loading" type="bars" />
            ) : (
                <DragDropContext onDragEnd={handleDragDrop}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <ul
                                css={queueListStyle}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {queueList}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
};
