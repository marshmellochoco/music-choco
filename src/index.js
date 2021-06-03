import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import App from "./App";
import "./index.css";
import { queueReducer } from "./Reducers/queueReducer";
import { songDataReducer } from "./Reducers/songDataReducer";

const rootReducer = combineReducers({queueReducer, songDataReducer})
const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
