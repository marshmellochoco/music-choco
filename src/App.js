import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AudioPlayer from "./components/AudioPlayer";
import Queue from "./components/Queue";
import Navbar from "./components/Navbar";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import HomePage from "./pages/HomePage";
import MediaSession from "./components/MediaSession";

const App = () => {
    const [openQueue, setOpenQueue] = useState(false);
    const queue = useSelector((state) => state.queueReducer);
    const { playingTrack } = useSelector((state) => state.playerReducer);

    const tempFn = () => {
        console.log(playingTrack);
    };

    return (
        <Router>
            <Navbar />
            <div
                className={`w-full overflow-y-auto ${
                    queue.length <= 0 && "full-height"
                }`}
            >
                <div className={openQueue ? "hidden" : "block"}>
                    <Switch>
                        <Route path="/artist/:id" component={ArtistPage} />
                        <Route path="/album/:id" component={AlbumPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </div>
                <Queue openQueue={openQueue} setOpenQueue={setOpenQueue} />
            </div>
            {queue.length > 0 && (
                <>
                    <AudioPlayer
                        openQueue={openQueue}
                        setOpenQueue={setOpenQueue}
                    />
                    {playingTrack.artists && (
                        <MediaSession
                            title={playingTrack.title}
                            artist={playingTrack.artists.map(a=>a.name).join(", ")}
                            album={playingTrack.album.name}
                            artwork={[
                                {
                                    src: playingTrack.album.image,
                                },
                            ]}
                            onPlay={tempFn}
                            onPause={tempFn}
                            onSeekBackward={tempFn}
                            onSeekForward={tempFn}
                            onPreviousTrack={tempFn}
                            onNextTrack={tempFn}
                        />
                    )}
                </>
            )}
        </Router>
    );
};

export default App;
