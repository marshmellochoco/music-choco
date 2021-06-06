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

    return (
        <div className="App" onContextMenu={(e) => e.preventDefault()}>
            {authToken !== "null" && authToken ? (
                <div className="app-container">
                    <Router basename="/">
                        <div className="page-container">
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
