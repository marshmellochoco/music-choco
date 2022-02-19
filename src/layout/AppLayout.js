import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { logoutAction } from "../store/user/userAction";

import Navbar from "../components/Navbar";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import Queue from "../components/Queue/Queue";

const AppLayout = ({ children, setLoggedIn }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [openQueue, setOpenQueue] = useState(false);
    const queue = useSelector((state) => state.queueReducer);

    useEffect(() => {
        if (queue.length === 0) setOpenQueue(false);
    }, [queue]);

    useEffect(() => {
        document.getElementById("window").scrollTo(0, 0);
    }, [location]);

    const onContextMenu = (e) => {
        e.preventDefault();
    };

    const logout = () => {
        setLoggedIn(false);
        dispatch(logoutAction());
        window.location.reload();
    };

    return (
        <div
            onContextMenu={onContextMenu}
            className="min-h-screen bg-background dark:bg-backgroundDark"
        >
            <div id="modal"></div>
            <Navbar resetToken={logout} />
            <div id="window" className="w-full overflow-y-auto">
                <div className={openQueue ? "hidden" : "block"}>{children}</div>
                <Queue
                    openQueue={openQueue}
                    setOpenQueue={setOpenQueue}
                    location={location}
                />
            </div>
            <AudioPlayer
                openQueue={openQueue}
                setOpenQueue={setOpenQueue}
                showPlayer={queue.length !== 0}
            />
        </div>
    );
};

export default AppLayout;
