// dependancy import
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./store/reducers/rootReducer";

// component import
import "./index.css";
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
