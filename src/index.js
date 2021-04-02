import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import initAuth from "./auth";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

function renderApp(auth) {
  ReactDOM.render(
    <React.StrictMode>
      <App auth={auth} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

window.addEventListener("DOMContentLoaded", () => initAuth(renderApp));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
