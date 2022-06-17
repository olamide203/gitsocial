import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./components/MainRouter";
import "../dist/index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<MainRouter />);
