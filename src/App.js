import { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Player } from "./Components/AudioPlayer/Player";
import { Queue } from "./Components/Queue/Queue";
import { Album } from "./Pages/Album/Album";
import { Home } from "./Pages/Home/Home";

function App() {
    const [queue, setQueue] = useState([]);
    const [playingSong, setPlayingSong] = useState(null);
    const [playing, setPlaying] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    return (
        <div className="App" onContextMenu={(e) => e.preventDefault()}>
            <div className="app-container">
                <Router basename="/music-choco">
                    <div className="page-container">
                        <Switch>
                            <Route exact path="/">
                                <Home
                                    apiUrl={apiUrl}
                                    setQueue={setQueue}
                                    setPlayingSong={setPlayingSong}
                                    setPlaying={setPlaying}
                                />
                            </Route>
                            <Route path="/albums/:id">
                                <Album
                                    playingSong={playingSong}
                                    setPlayingSong={setPlayingSong}
                                    queue={queue}
                                    setQueue={setQueue}
                                    setPlaying={setPlaying}
                                    apiUrl={apiUrl}
                                />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <Queue
                    playingSong={playingSong}
                    setPlayingSong={setPlayingSong}
                    queue={queue}
                    setQueue={setQueue}
                    setPlaying={setPlaying}
                    apiUrl={apiUrl}
                />
                <Player
                    playingSong={playingSong}
                    setPlayingSong={setPlayingSong}
                    queue={queue}
                    playing={playing}
                    setPlaying={setPlaying}
                    apiUrl={apiUrl}
                />
            </div>
        </div>
    );
}

export default App;

// TODO: Prevent sending 'undefined' as api request

// TODO: Song already in queue

// TODO: Searchbar
// TODO: Homepage can add recommendation
// TODO: Looping
// TODO: Random
