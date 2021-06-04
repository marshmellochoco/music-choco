// dependancy import
import { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// component import
import { Player } from "./Components/AudioPlayer/Player";
import { Queue } from "./Pages/Queue/Queue";
import { Album } from "./Pages/Album/Album";
import { Home } from "./Pages/Home/Home";
import { EditAlbum } from "./Pages/AddSong/EditAlbum";
import { Login } from "./Pages/Login/Login";
import { useSelector } from "react-redux";

function App() {
    const [randomQueue, setRandomQueue] = useState([]);
    const authToken = useSelector((state) => state.authReducer.token);
    const apiUrl = process.env.REACT_APP_API_URL;

    return (
        <div className="App" onContextMenu={(e) => e.preventDefault()}>
            <div className="app-container">
                <Router basename="/music-choco">
                    <div className="page-container">
                        <Switch>
                            <Route exact path="/">
                                {authToken !== "null" && authToken ? (
                                    <Home apiUrl={apiUrl} />
                                ) : (
                                    <Login apiUrl={apiUrl} />
                                )}
                            </Route>
                            <Route path="/albums/:id">
                                <Album apiUrl={apiUrl} />
                            </Route>
                            <Route path="/add">
                                <EditAlbum apiUrl={apiUrl} />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <Queue apiUrl={apiUrl} setRandomQueue={setRandomQueue} />
                <Player apiUrl={apiUrl} randomQueue={randomQueue} />
            </div>
        </div>
    );
}

export default App;

// TODO: Song already in queue
// TODO: Homepage can add recommendation
// TODO: Pull song from album to queue or playlists

// TODO: Login
// TODO: Add song list, favorite
