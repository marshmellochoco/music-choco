import { MainComponent } from "./MainComponent";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const MainContainer = () => {
    const [search, setSearch] = useState("");
    const [username, setUsername] = useState("username");
    const authToken = useSelector((state) => state.authReducer.token);
    const uid = useSelector((state) => state.authReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Re-authenticate the token
        if (authToken && authToken != "null") {
            axios
                .get(`${process.env.REACT_APP_API_URL}/auth`, {
                    headers: { Authorization: authToken },
                })
                .then((res) => setUsername(res.data.username))
                .catch((e) => {
                    if (e.response.status === 401)
                        dispatch({ type: "RESET_TOKEN" });
                });
        }
    }, [authToken]);

    const handleLogout = () => {
        // logout to clear the token and refresh all data
        dispatch({ type: "RESET_TOKEN" });
        window.location.reload();
    };

    return (
        <MainComponent
            handleLogout={handleLogout}
            setSearch={setSearch}
            search={search}
            username={username}
        />
    );
};