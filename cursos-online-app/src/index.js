import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initialState } from "./contexto/initialState";
import { StateProvider } from "./contexto/store";
import { mainReducer } from "./contexto/reducers";

ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={mainReducer}>
            <App />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
