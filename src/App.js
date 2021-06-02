import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Player } from "./Components/AudioPlayer/Player";
import { Queue } from "./Pages/Queue/Queue";
import { Album } from "./Pages/Album/Album";
import { Home } from "./Pages/Home/Home";
import { EditAlbum } from "./Pages/Album/EditAlbum";

function App() {
    const [queue, setQueue] = useState([]);
    const [randomQueue, setRandomQueue] = useState([]);
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
                                    queue={queue}
                                    setQueue={setQueue}
                                    playingSong={playingSong}
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
                            <Route path="/add">
                                <EditAlbum apiUrl={apiUrl} />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <Queue
                    apiUrl={apiUrl}
                    playingSong={playingSong}
                    setPlayingSong={setPlayingSong}
                    queue={queue}
                    setQueue={setQueue}
                    setPlaying={setPlaying}
                    isRandom={isRandom}
                    setRandom={setRandom}
                    isLoop={isLoop}
                    setLoop={setLoop}
                    setRandomQueue={setRandomQueue}
                />
                <Player
                    apiUrl={apiUrl}
                    playingSong={playingSong}
                    setPlayingSong={setPlayingSong}
                    queue={queue}
                    playing={playing}
                    setPlaying={setPlaying}
                    isRandom={isRandom}
                    isLoop={isLoop}
                    randomQueue={randomQueue}
                />
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