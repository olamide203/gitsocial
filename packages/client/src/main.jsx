import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./components/MainRouter";
import "../dist/index.css";

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<MainRouter />);
ReactDOM.hydrateRoot(<MainRouter />, rootElement);
