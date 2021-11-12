import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AudioPlayer from "./components/AudioPlayer";
import Queue from "./common/Queue/Queue";
import Navbar from "./components/Navbar";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import HomePage from "./pages/HomePage";

const App = () => {
    const [openQueue, setOpenQueue] = useState(false);
    const queue = useSelector((state) => state.queueReducer);

    return (
        <Router>
            <Navbar />
            <div
                className={`w-full overflow-y-auto ${
                    queue.length <= 0 && "full-height"
                }`}
            >
                {!openQueue && (
                    <Switch>
                        <Route path="/artist/:id">
                            <ArtistPage />
                        </Route>
                        <Route path="/album/:id">
                            <AlbumPage />
                        </Route>
                        <Route path="/" component={HomePage} />
                    </Switch>
                )}
                <Queue openQueue={openQueue} setOpenQueue={setOpenQueue} />
            </div>
            {queue.length > 0 && (
                <AudioPlayer
                    openQueue={openQueue}
                    setOpenQueue={setOpenQueue}
                />
            )}
        </Router>
    );
};

export default App;
