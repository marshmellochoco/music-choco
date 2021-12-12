import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AudioPlayer from "./components/AudioPlayer";
import Queue from "./components/Queue";
import Navbar from "./components/Navbar";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
    const [openQueue, setOpenQueue] = useState(false);
    const [auth, setAuth] = useState(null);
    const queue = useSelector((state) => state.queueReducer);

    return (
        <>
            {auth === null ? (
                <Router>
                    <Switch>
                        <Route path="/">
                            <LoginPage setAuth={setAuth} />
                        </Route>
                    </Switch>
                </Router>
            ) : (
                <Router>
                    <Navbar />
                    <div
                        className={`w-full overflow-y-auto ${
                            queue.length <= 0 && "full-height"
                        }`}
                    >
                        <div className={openQueue ? "hidden" : "block"}>
                            <Switch>
                                <Route
                                    path="/artist/:id"
                                    component={ArtistPage}
                                />
                                <Route
                                    path="/album/:id"
                                    component={AlbumPage}
                                />
                                <Route path="/" component={HomePage} />
                            </Switch>
                        </div>
                        <Queue
                            openQueue={openQueue}
                            setOpenQueue={setOpenQueue}
                        />
                    </div>
                    {queue.length > 0 && (
                        <AudioPlayer
                            openQueue={openQueue}
                            setOpenQueue={setOpenQueue}
                        />
                    )}
                </Router>
            )}
        </>
    );
};

export default App;
