import { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Player } from "./Components/AudioPlayer/Player";
import { Navbar } from "./Components/Navbar/Navbar";
import { Album } from "./Pages/Album/Album";
import { Home } from "./Pages/Home/Home";

function App() {
    const [queue, setQueue] = useState([
        "60885e8e5bb4983d48b7ab5b",
        "60885ecd5bb4983d48b7ab63",
    ])
    return (
        <div className="App">
            <div className="app-container">
                <Router basename="/react-music-player">
                    <Navbar />
                    <div className="page-container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/albums/:id" component={Album} />
                        </Switch>
                    </div>
                </Router>
                <Player queue={queue} setQueue={setQueue}/>
            </div>
        </div>
    );
}

export default App;
