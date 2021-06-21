/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const LoginPageComponent = ({
    setUsername,
    setPassword,
    login,
    signup,
    err,
}) => {
    // styles
    const loginStyle = css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        color: var(--primary-color);
    `;

    const loginLayoutStyle = css`
        margin: auto;
        background-color: white;
        padding: 2rem;

        & > h1 {
            margin: 0;
            margin-bottom: 1rem;
        }

        & button {
            margin: 0.5rem 0;
            width: 100%;
            height: 2rem;
            color: grey;
            border: 1px solid grey;
            background-color: white;
            cursor: pointer;

            &:hover {
                background-color: var(--thirtiary-color);
                color: var(--primary-color);
            }
        }

        & #signup {
            background-color: var(--primary-color);
            color: var(--contrast-color);
            &:hover {
                background-color: var(--secondary-color);
            }
        }
    `;

    const formFieldStyle = css`
        width: 18rem;
        padding: 1rem 0;
        display: flex;
        flex-direction: column;

        & > input {
            margin: 0 0;
            height: 1.5em;
        }
    `;

    // markdown
    return (
        <div css={loginStyle}>
            <div css={loginLayoutStyle}>
                <h1>Login</h1>
                <span
                    css={css`
                        color: red;
                    `}
                >
                    {err === "" ? "" : err}
                </span>
                <form>
                    <div css={formFieldStyle}>
                        <label>Username: </label>
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div css={formFieldStyle}>
                        <label>Password: </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        Log In
                    </button>
                    <button
                        id="signup"
                        onClick={(e) => {
                            e.preventDefault();
                            signup();
                        }}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};
