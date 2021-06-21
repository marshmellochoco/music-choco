import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/actions/authActions";

import { LoginPageComponent } from "./LoginPageComponent";

export const LoginPageContainer = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const dispatch = useDispatch();

    const login = async () => {
        setErr("");
        await axios
            .post(`${apiUrl}/auth/login`, {
                credentials: { username, password },
            })
            .then((result) => {
                dispatch(setToken(result.data.authToken, result.data.userid));
                if (result.data.authToken === "") {
                    setErr("Invalid username or password.");
                }
            })
            .catch((err) => setErr(err));
    };

    const signup = async () => {
        setErr("");
        await axios
            .post(`${apiUrl}/auth/signup`, {
                credentials: { username, password },
            })
            .then((result) => {
                dispatch(setToken(result.data.authToken, result.data.userid));
            })
            .catch((err) => setErr(err));
    };

    return (
        <LoginPageComponent
            setUsername={setUsername}
            setPassword={setPassword}
            login={login}
            signup={signup}
            err={err}
        />
    );
};
