import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./index.css";
import "./fonts/Abel-Regular.ttf";
import "./fonts/DancingScript.ttf";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
