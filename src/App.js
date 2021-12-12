import { useState } from "react";
import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import AudioPlayer from "./components/AudioPlayer";
import Queue from "./components/Queue";
import Navbar from "./components/Navbar";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
    const [openQueue, setOpenQueue] = useState(false);
    const [auth, setAuth] = useState(null);
    const queue = useSelector((state) => state.queueReducer);

    return (
        <>
            {auth === null ? (
                <Router>
                    <Switch>
                        <Route path="/login">
                            <LoginPage setAuth={setAuth} />
                        </Route>
                        <Route path="/signUp">
                            <SignUpPage setAuth={setAuth} />
                        </Route>
                        <Route path="/">
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                </Router>
            ) : (
                <Router>
                    <Navbar resetToken={() => setAuth(null)} />
                    <div
                        className={`w-full overflow-y-auto ${
                            queue.length <= 0 && "full-height"
                        }`}
                        onContextMenu={(e) => e.preventDefault()}
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
                                <Route exact path="/" component={HomePage} />
                                <Route path="/">
                                    <Redirect to="/" />
                                </Route>
                            </Switch>
                        </div>
                        <Queue
                            openQueue={openQueue}
                            setOpenQueue={setOpenQueue}
                        />
                    </div>
                    <AudioPlayer
                        openQueue={openQueue}
                        setOpenQueue={setOpenQueue}
                        showPlayer={queue.length === 0}
                    />
                </Router>
            )}
        </>
    );
};

export default App;
