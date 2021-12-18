import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setToken } from "../store/user/userAction";
import { useState } from "react";
import { userLogin } from "../api/userApi";
import axios from "axios";

const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const signUp = () => {
        history.push("/signUp");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        userLogin({ email, password }).then((response) => {
            if (response.token) {
                axios.defaults.headers.common["Authorization"] = response.token;
                dispatch(setToken(response.token));
            }
        });
    };

    return (
        <>
            <div className="mx-2">
                <form className="inputGroup" onSubmit={login}>
                    <div className="input">
                        <label htmlFor="textEmail">Email address</label>
                        <input
                            type="text"
                            id="textEmail"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="textPassword">Password</label>
                        <input
                            type="password"
                            id="textPassword"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>
                            <input
                                type="checkbox"
                                id="checkRemember"
                                className="mr-1"
                            />
                            <label htmlFor="checkRemember">Remember me</label>
                        </div>
                        <Link className="textLink" to="/forgotPassword">
                            Forgot your password?
                        </Link>
                    </div>
                    <input
                        type="submit"
                        value={"Login"}
                        className="bg-red-100 h-10 btn w-full"
                    />
                </form>
                <hr className="my-8" />
                <div className="flex flex-col text-center gap-4">
                    <span>Don't have an account?</span>
                    <button
                        className="btn border-2 border-black"
                        onClick={signUp}
                    >
                        Sign up now
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
