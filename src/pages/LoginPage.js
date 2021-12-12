import logo from "../images/music-choco.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from "react";
import { userLogin } from "../api/userApi";

const LoginPage = ({ setAuth }) => {
    const history = useHistory();
    const signUp = () => {
        history.push("/signUp");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        userLogin({ email, password }).then((response) => {
            if (response.token) setAuth(response);
        });
    };

    return (
        <div>
            <div>
                <img
                    src={logo}
                    alt={"music-choco"}
                    className="mx-auto mt-4 mb-4 max-w-lg h-12"
                />
                <hr />
            </div>
            <div className="mx-auto mt-12 max-w-lg">
                <div className="mx-2">
                    <form className="inputGroup">
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
                                <label htmlFor="checkRemember">
                                    Remember me
                                </label>
                            </div>
                            <Link
                                className="underline cursor-pointer"
                                to="/forgotPassword"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <button
                            className="bg-red-100 h-10 btn w-full"
                            onClick={login}
                        >
                            Login
                        </button>
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
            </div>
        </div>
    );
};

export default LoginPage;
