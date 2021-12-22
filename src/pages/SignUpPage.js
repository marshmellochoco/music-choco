import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userSignUp } from "../api/userApi";
import { setToken } from "../store/user/userAction";
import axios from "axios";

const SignUpPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return;

        userSignUp({ email, password }).then((response) => {
            if (response.token) {
                dispatch(setToken(response.token));
                history.push("/");
            }
        });
    };

    return (
        <>
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
                    <div className="input">
                        <label htmlFor="textConfirmPassword">Password</label>
                        <input
                            type="password"
                            id="textConfirmPassword"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <button
                        className="bg-red-100 h-10 btn w-full"
                        onClick={signUp}
                    >
                        Sign Up
                    </button>
                    <div className="text-center">
                        <span>Have an account? </span>
                        <Link to="/login" className="textLink">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUpPage;
