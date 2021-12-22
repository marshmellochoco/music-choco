import React from "react";
import ReactDOM from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./index.css";
import "./styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/rootReducer";

const store = createStore(rootReducer);

const alertOption = {
    position: positions.TOP_CENTER,
    timeout: 3000,
    offset: "5rem",
    transition: transitions.FADE,
};

// TODO: Custom alert template

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOption}>
                <App />
            </AlertProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
