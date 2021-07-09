import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, getResponse } from "./api";
import { MainComponent } from "./MainComponent";
import { resetToken } from "./store/actions/authActions";

export const MainContainer = () => {
    const [conn, setConn] = useState(true);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [username, setUsername] = useState("username");
    const authToken = useSelector((state) => state.authReducer.token);
    const uid = useSelector((state) => state.authReducer.user);
    const openQueue = useSelector((state) => state.queueReducer.openQueue);
    const dispatch = useDispatch();

    useEffect(() => {
        getResponse()
            .then(() => setLoading(false))
            .catch((e) => {
                setConn(e.response != null);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Re-authenticate the token
        if (authToken && authToken != "null") {
            getAuth(authToken)
                .then((res) => setUsername(res.data.username))
                .catch((e) => {
                    if (e.response.status === 401) dispatch(resetToken());
                });
        }
    }, [uid]);

    const handleLogout = () => {
        // logout to clear the token and refresh all data
        dispatch({ type: "RESET_TOKEN" });
        window.location.reload();
    };

    return (
        <MainComponent
            loading={loading}
            conn={conn}
            token={authToken}
            search={search}
            username={username}
            openQueue={openQueue}
            setSearch={setSearch}
            handleLogout={handleLogout}
        />
    );
};
