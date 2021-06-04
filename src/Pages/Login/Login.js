import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";

export const Login = ({ apiUrl, setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await userLogin({ username, password });
        dispatch({ type: "SET_TOKEN", token: token });
    };

    const userLogin = async (credentials) => {
        let token;
        await axios
            .post(`${apiUrl}/login`, { credentials })
            .then((result) => (token = result.data.token))
            .catch((err) => console.log(err));
        return token;
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
                        <button onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
