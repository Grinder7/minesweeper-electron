import React from "react";
import ReactDOM from "react-dom/client";
import {HashRouter, Route, Routes} from "react-router-dom";
import App from "../Pages/App.jsx";
import Game from "../Pages/Game.jsx";
import Options from "../Pages/Options.jsx";
import About from "../Pages/About.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<Game />} />
        <Route path="/options" element={<Options />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
