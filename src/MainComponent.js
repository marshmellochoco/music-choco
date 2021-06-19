/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiMagnify } from "@mdi/js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AlbumPageContainer } from "./pages/AlbumPage/AlbumPageContainer";
import { AudioPlayerContainer } from "./common/AudioPlayer/AudioPlayerContainer";
import { QueueContainer } from "./common/Queue/QueueContainer";
import { SearchContainer } from "./common/Search/SearchContainer";
import { HomePageContainer } from "./pages/HomePage/HomePageContainer";

export const MainComponent = ({
    username,
    search,
    handleLogout,
    setSearch,
}) => {
    // styles
    const appStyle = css`
        overflow-y: scroll;
        width: 96%;
        height: 100%;
        padding: 0 2%;
    `;

    const appHeaderStyle = css`
        display: flex;
        height: 8vh;
        align-items: center;
        justify-content: space-between;
    `;

    const leftHeaderStyle = css`
        display: flex;
        align-items: center;
    `;

    const searchbarStyle = css`
        height: 2rem;
        padding: 0 0.5rem;
        margin: 0 1rem;
        display: flex;
        align-self: center;
        background-color: var(--contrast-color);
        border-radius: 2rem;

        & svg {
            align-self: center;
            margin: 0;
            color: var(--primary-color);
            width: 24px;
            height: 24px;
        }
        & input[type="text"] {
            display: flex;
            height: 1em;
            font-size: 1em;
            align-self: center;
            border: none;
            background-color: var(--contrast-color);
            outline: none;
        }
    `;

    const loggedUserStyle = css`
        display: flex;
        height: 2rem;
        min-width: 8rem;
        align-items: center;
        padding: 0 0.5rem;
        cursor: pointer;
        &:hover {
            background-color: var(--thirtiary-color);
        }
        & > svg {
            margin: 0.5rem;
        }
    `;

    console.log(search);
    // markdown
    return (
        <div className="App" onContextMenu={(e) => e.preventDefault()}>
            <div className="app-container">
                <Router basename="/">
                    <div css={appStyle}>
                        <div css={appHeaderStyle}>
                            <div css={leftHeaderStyle}>
                                <h1>music-choco</h1>
                                <div>
                                    <div css={searchbarStyle}>
                                        <Icon path={mdiMagnify} />
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div css={loggedUserStyle} onClick={handleLogout}>
                                <Icon path={mdiAccountCircle} size={1} />
                                <span>{username}</span>
                            </div>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                {search === "" ? (
                                    <HomePageContainer />
                                ) : (
                                    <SearchContainer search={search} />
                                )}
                            </Route>
                            <Route path="/albums/:id">
                                <AlbumPageContainer />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <QueueContainer />
                <AudioPlayerContainer />
            </div>
        </div>
    );
};