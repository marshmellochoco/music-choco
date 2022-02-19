import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Provider as AlertProvider } from "react-alert";
import "./styles/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import rootReducer from "./store/rootReducer";
import Alert from "./components/Alert";

const store = createStore(rootReducer);

const alertOption = {
    position: "top center",
    transition: "fade",
    timeout: 2500,
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AlertProvider template={Alert} {...alertOption}>
                <App />
            </AlertProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
