import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Player } from "./Components/AudioPlayer/Player";
import { Queue } from "./Components/Queue/Queue";
import { Album } from "./Pages/Album/Album";
import { Home } from "./Pages/Home/Home";

function App() {
    const [queue, setQueue] = useState([]);
    const [randomQueue, setRandomQueue]= useState([]);
    const [playingSong, setPlayingSong] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [isRandom, setRandom] = useState(false);
    const [isLoop, setLoop] = useState(false);
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
                    isRandom={isRandom}
                    setRandom={setRandom}
                    isLoop={isLoop}
                    setLoop={setLoop}
                    setRandomQueue={setRandomQueue}
                />
                <Player
                    playingSong={playingSong}
                    setPlayingSong={setPlayingSong}
                    queue={queue}
                    playing={playing}
                    setPlaying={setPlaying}
                    apiUrl={apiUrl}
                    isRandom={isRandom}
                    isLoop={isLoop}
                    randomQueue={randomQueue}
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
// TODO: Volume thumb

// TODO: Screen scroll when now playing is below
// TODO: Loop and random feels 
// TODO: Button have to give some impact
// TODO: Add song

// TODO: Pull song from album to queue
// TODO: Drag and drop style with background
// TODO: Drag and drop item sometime cannot drag
// TODO: Drag and drop item style will go off
// TODO: Drag and drop item can stuck sometimes

// TODO: Login