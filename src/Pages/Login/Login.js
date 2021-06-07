import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";

const apiUrl = process.env.REACT_APP_API_URL;
const handleLogin = async (credentials, callback) => {
    let res;
    await axios
        .post(`${apiUrl}/auth/login`, { credentials })
        .then((result) => {
            res = result.data;
        })
        .catch((err) => console.log(err));
    callback(res);
};

const handleRegister = async (credentials, callback) => {
    let res;
    await axios
        .post(`${apiUrl}/auth/signup`, { credentials })
        .then((result) => {
            res = result.data;
        })
        .catch((err) => console.log(err));
    callback(res);
};

const login = handleLogin;
const register = handleRegister;

export const Login = ({ handleLogin = login, handleRegister = register }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="login">
            <h1>music-choco</h1>
            <div className="login-container">
                <h1>Login</h1>
                <form>
                    <label>
                        <p>Username</p>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div>
                        <button
                            id="login"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogin({ username, password }, (result) =>
                                    dispatch({
                                        type: "SET_TOKEN",
                                        token: result.authToken,
                                        user: result.userid,
                                    })
                                );
                            }}
                        >
                            Login
                        </button>
                        <button
                            id="register"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRegister(
                                    { username, password },
                                    (result) =>
                                        dispatch({
                                            type: "SET_TOKEN",
                                            token: result.authToken,
                                            user: result.userid,
                                        })
                                );
                            }}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
