import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";

export const Login = ({ apiUrl }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        userLogin({ username, password });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        userRegister({ username, password });
    };

    const userLogin = async (credentials) => {
        let token;
        await axios
            .post(`${apiUrl}/auth`, { credentials })
            .then((result) => (token = result.data.token))
            .catch((err) => console.log(err));
        dispatch({ type: "SET_TOKEN", token: token });
    };

    const userRegister = async (credentials) => {
        let token;
        await axios
            .post(`${apiUrl}/auth/register`, { credentials })
            .then((result) => (token = result.data.token))
            .catch((err) => console.log(err));
        dispatch({ type: "SET_TOKEN", token: token });
    };

    return (
        <div className="login">
            <h1>music-choco</h1>
            <div className="login-container">
                <h1>Login</h1>
                <form>
                    <label>
                        <p>Username</p>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={handleRegister}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
