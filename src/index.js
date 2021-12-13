import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/rootReducer";

const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
