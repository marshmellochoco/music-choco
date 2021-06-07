// dependancy import
import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccountCircle } from "@mdi/js";

// component import
import { Player } from "./Components/AudioPlayer/Player";
import { Queue } from "./Pages/Queue/Queue";
import { Album } from "./Pages/Album/Album";
import { Home } from "./Pages/Home/Home";
import { EditAlbum } from "./Pages/AddSong/EditAlbum";
import { Login } from "./Pages/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Searchbar } from "./Components/Searchbar/Searchbar";

function App() {
    const [randomQueue, setRandomQueue] = useState([]);
    const [search, setSearch] = useState([]);
    const authToken = useSelector((state) => state.authReducer.token);
    const dispatch = useDispatch();

    useEffect(() => {
        // Re-authenticate the token
        if (authToken && authToken != "null") {
            axios
                .get(`${process.env.REACT_APP_API_URL}/auth`, {
                    headers: { Authorization: authToken },
                })
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
            {authToken !== "null" && authToken ? (
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
                                    <span>Username</span>
                                </div>
                            </div>
                            <Switch>
                                <Route exact path="/">
                                    <Home />
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
                    <Player randomQueue={randomQueue} />
                </div>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;

// TODO: Song already in queue
// TODO: Homepage can add recommendation
// TODO: Pull song from album to queue or playlists

// TODO: Login
// TODO: Add song list, favorite
