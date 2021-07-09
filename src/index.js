// dependancy import
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

// component import
import "./index.css";
import { rootReducer } from "./store/rootReducer";
import { MainContainer } from "./MainContainer";

const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <MainContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// TODO: add playlist, favouraite
// TODO: keyboard shortcut
// Space: Play / Pause
// Shift+N: Next
// Shift+P: Previous
// Up: Volume up
// Down: Volume down
// M: Mute
// Shift+S: Shuffle
// Shift+R: Random
// Q: Toggle queue
// TODO: Let user change theme
// TODO: Let user change background
// TODO: Allow user to use without login
// TODO: Hover to view queue
