import { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Player } from "./Components/AudioPlayer/Player";
import { Queue } from "./Components/Queue/Queue";
import { Album } from "./Pages/Album/Album";
import { Home } from "./Pages/Home/Home";

function App() {
    const [queue, setQueue] = useState([]);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
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
                                <Album
                                    index={index}
                                    setIndex={setIndex}
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
                    index={index}
                    setIndex={setIndex}
                    queue={queue}
                    setQueue={setQueue}
                    setPlaying={setPlaying}
                    apiUrl={apiUrl}
                />
                <Player
                    index={index}
                    setIndex={setIndex}
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

// TODO: Add whole album to queue when played

// TODO: Button to add to queue
// TODO: Button to remove from queue
// TODO: Song already in queue

// TODO: Searchbar
// TODO: Homepage can add recommendation
