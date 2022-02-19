import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { userSignUp } from "../api/userApi";
import { setToken, setUser } from "../store/user/userAction";

const SignUpPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signUp = (e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            alert.error("The password confirmation does not match");
            setLoading(false);
            return;
        }

        userSignUp({ email, password })
            .then((response) => {
                setLoading(false);
                if (response.token) {
                    dispatch(setToken(response.token));
                    dispatch(setUser(response.id, response.displayName));
                    history.push("/");
                } else {
                    alert.error("Something went wrong");
                }
            })
            .catch(() => {
                setLoading(false);
                alert.error("User already exist");
            });
    };

    return (
        <>
            <div className="mx-2">
                <form className="inputGroup">
                    <div className="input">
                        <label htmlFor="textEmail">Email address</label>
                        <input
                            type="email"
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
                        <label htmlFor="textConfirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="textConfirmPassword"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className={`bg-primary-100 dark:bg-primaryDark-100 h-10 btn w-full ${
                            loading && "opacity-40"
                        }`}
                        disabled={loading}
                        onClick={signUp}
                    >
                        Sign Up
                    </button>
                    <div className="text-center">
                        <span>Have an account? </span>
                        <Link to="/login" className="link-text">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUpPage;
