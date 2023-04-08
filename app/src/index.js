import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./bootstrap-min.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";

// on ESC we want to close any open modals
document.addEventListener(
    "keydown",
    (event) => {
        // when ESC (=27) is pressed
        if (event.keyCode === 27) {
            // find all modals
            let app_modals = [...document.getElementsByClassName("app-modals")];
            let modals = [];
            app_modals.forEach((el) => {
                modals = [...modals, ...el.getElementsByClassName("modal")];
            });
            // iterate over all modals
            modals.forEach((modal) => {
                // close modal
                modal.classList.remove("show");
            });
        }
    },
    false
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
