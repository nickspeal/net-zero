import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import unregisterServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
unregisterServiceWorker();
