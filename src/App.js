// // dependancy import
import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccountCircle } from "@mdi/js";

// component import
import { Search } from "./pages/Search/Search";
import { EditAlbum } from "./pages/AddSong/EditAlbum";
// import { Login } from "./Pages/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Searchbar } from "./Components/Searchbar/Searchbar";
import { AudioPlayerContainer } from "./common/AudioPlayer/AudioPlayerContainer";
import { QueueContainer } from "./common/Queue/QueueContainer";
import { AlbumPageContainer } from "./pages/AlbumPage/AlbumPageContainer";

function App() {
    const [search, setSearch] = useState("");
    const [username, setUsername] = useState("");
    const authToken = useSelector((state) => state.authReducer.token);
    const uid = useSelector((state) => state.authReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Re-authenticate the token
        if (authToken && authToken != "null") {
            axios
                .get(`${process.env.REACT_APP_API_URL}/auth`, {
                    headers: { Authorization: authToken },
                })
                .then((res) => setUsername(res.data.username))
                .catch((e) => {
                    if (e.response.status === 401)
                        dispatch({ type: "RESET_TOKEN" });
                });
        }
    }, [authToken]);

    const handleLogout = () => {
        // logout to clear the token and refresh all data
        dispatch({ type: "RESET_TOKEN" });
        window.location.reload();
    };

    return (
        <div className="App" onContextMenu={(e) => e.preventDefault()}>
            <div className="app-container">
                <Router basename="/">
                    <div className="page-container">
                        <div className="page-header">
                            <div className="left-elements">
                                <h1>music-choco</h1>
                                <div className="searchbar">
                                    <Searchbar handleSearch={setSearch} />
                                </div>
                            </div>
                            <div className="loggedUser" onClick={handleLogout}>
                                <Icon path={mdiAccountCircle} size={1} />
                                <span>{username}</span>
                            </div>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <Search search={search} />
                            </Route>
                            <Route path="/albums/:id">
                                <AlbumPageContainer />
                            </Route>
                            <Route path="/add">
                                <EditAlbum />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <QueueContainer />
                <AudioPlayerContainer />
            </div>

            {/* {authToken !== "null" && authToken ? (
                <div className="app-container">
                    <Router basename="/">
                        <div className="page-container">
                            <div className="page-header">
                                <div className="left-elements">
                                    <h1>music-choco</h1>
                                    <div className="searchbar">
                                        <Searchbar handleSearch={setSearch} />
                                    </div>
                                </div>
                                <div
                                    className="loggedUser"
                                    onClick={handleLogout}
                                >
                                    <Icon path={mdiAccountCircle} size={1} />
                                    <span>{username}</span>
                                </div>
                            </div>
                            <Switch>
                                <Route exact path="/">
                                    <Search search={search} />
                                </Route>
                                <Route path="/albums/:id">
                                    <Album />
                                </Route>
                                <Route path="/add">
                                    <EditAlbum />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                    <Queue setRandomQueue={setRandomQueue} />
                    <AudioPla/>
                </div>
            ) : (
                <Login />
            )} */}
        </div>
    );
}

export default App;

// TODO: Song already in queue
// TODO: Homepage can add recommendation
// TODO: Pull song from album to queue or playlists

// TODO: Login
// TODO: Add song list, favorite
