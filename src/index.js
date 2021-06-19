// dependancy import
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./store/reducers/rootReducer";

// component import
import "./index.css";
import { AppContainer } from "./AppContainer";

const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
