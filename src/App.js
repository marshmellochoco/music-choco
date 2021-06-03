// dependancy import
import { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// component import
import { Player } from "./Components/AudioPlayer/Player";
import { Queue } from "./Pages/Queue/Queue";
import { Album } from "./Pages/Album/Album";
import { Home } from "./Pages/Home/Home";
import { EditAlbum } from "./Pages/AddSong/EditAlbum";

function App() {
    const [randomQueue, setRandomQueue] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    return (
        <div className="App" onContextMenu={(e) => e.preventDefault()}>
            <div className="app-container">
                <Router basename="/music-choco">
                    <div className="page-container">
                        <Switch>
                            <Route exact path="/">
                                <Home apiUrl={apiUrl} />
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

// TODO: Loop and random feels
// TODO: ^ Button have to give some feedback

// TODO: Pull song from album to queue or playlists

// TODO: Login
// TODO: Add song list, favorite
