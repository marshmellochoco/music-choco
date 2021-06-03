// dependancy import
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

// component import
import { queueReducer } from "./Reducers/queueReducer";
import { songDataReducer } from "./Reducers/songDataReducer";
import { playerReducer } from "./Reducers/playerReducer";
import App from "./App";
import "./index.css";

const rootReducer = combineReducers({
    queueReducer,
    songDataReducer,
    playerReducer,
});
const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
