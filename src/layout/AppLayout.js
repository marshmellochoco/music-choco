import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { logoutAction } from "../store/user/userAction";

import Navbar from "../components/Navbar";
import AudioPlayer from "../components/AudioPlayer";
import Queue from "../components/Queue/Queue";

const AppLayout = ({ children, setLoggedIn }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [openQueue, setOpenQueue] = useState(false);
    const queue = useSelector((state) => state.queueReducer);

    const onContextMenu = (e) => {
        e.preventDefault();
    };

    const logout = () => {
        setLoggedIn(false);
        dispatch(logoutAction());
    };

    return (
        <div onContextMenu={onContextMenu} className="h-screen">
            <Navbar resetToken={logout} location={location} />
            <div
                className={`w-full overflow-y-auto ${
                    queue.length <= 0 && "full-height"
                }`}
            >
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
                showPlayer={queue.length === 0}
            />
        </div>
    );
};

export default AppLayout;
