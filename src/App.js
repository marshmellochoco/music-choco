import { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Player } from "./Components/AudioPlayer/Player";
import { Queue } from "./Components/Queue/Queue";
import { Album } from "./Pages/Album/Album";
import { Home } from "./Pages/Home/Home";

function App() {
    const [queue, setQueue] = useState([]);
    const [playing, setPlaying] = useState(false);

    return (
        <div className="App" onContextMenu={(e) => e.preventDefault()}>
            <div className="app-container">
                <Router basename="/react-music-player">
                    <div className="page-container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/albums/:id">
                                <Album
                                    queue={queue}
                                    setQueue={setQueue}
                                    setPlaying={setPlaying}
                                />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <Queue queue={queue} setQueue={setQueue} setPlaying={setPlaying}/>
                <Player
                    queue={queue}
                    setQueue={setQueue}
                    playing={playing}
                    setPlaying={setPlaying}
                />
            </div>
        </div>
    );
}

export default App;
