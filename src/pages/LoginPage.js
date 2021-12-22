import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { setToken } from "../store/user/userAction";
import { userLogin } from "../api/userApi";

const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        userLogin({ email, password })
            .then((response) => {
                if (response.token) {
                    dispatch(setToken(response.token));
                    history.push("/");
                }
            })
            .catch(() => alert.error("Invalid email or password"));
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
                    <Link to={"/signUp"} className="btn border-2 border-black">
                        Sign up now
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
