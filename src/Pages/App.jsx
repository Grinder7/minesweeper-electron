import React from "react";
import {Link} from "react-router-dom";

function App() {
  return (
    <div className="grid place-content-center h-full">
      <div className="container">
        <div className="text-white text-center font-medium">Minesweeper</div>
        <div className="join join-vertical mt-3">
          <Link to="/game" className="btn btn-neutral join-item">
            Start Game
          </Link>
          <Link to="/options" className="btn btn-neutral join-item">
            Options
          </Link>
          <Link to="/about" className="btn btn-neutral join-item">
            About
          </Link>
          <a
            className="btn btn-neutral join-item"
            onClick={() => window.close()}
          >
            Exit
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
