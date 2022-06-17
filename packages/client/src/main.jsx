import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./components/MainRouter";
import "../dist/index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <MainRouter />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <MainRouter />
    </React.StrictMode>
  );
}
