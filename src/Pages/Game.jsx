import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import Popup from "../Components/Popup.jsx";
import Timer from "../Components/Timer.jsx";

const Context = createContext();
const TimerContext = createContext();
const numBombsFunction = () => {
  return parseInt(localStorage.getItem("numBombsOption"), 10) || 10;
};
const numGridsFunction = () => {
  return parseInt(localStorage.getItem("numGridsOption"), 10) || 10;
};

let arrayNumBombs = [];

function MineGrid({x, y, isBomb, setNumBombs, bombPositions}) {
  const [isActive, setIsActive] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const numBombsAround = (() => {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i == x && j == y) {
          continue;
        }
        if (bombPositions.has(`${i}-${j}`)) {
          count++;
        }
      }
    }
    return count.toString();
  })();
  const {setGameScore} = useContext(Context);

  const {timerIsActive, setTimerIsActive} = useContext(TimerContext);

  const numGridsOption = numGridsFunction();

  const mouseDownEventEmitter = (element) => {
    element.dispatchEvent(
      new MouseEvent("mousedown", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    );
  };

  const revealAllBombs = (bombPositions) => {
    bombPositions.forEach((bombPosition) => {
      let bombElement = document.querySelector(`[data-pos="${bombPosition}"]`);
      bombElement.classList.add("bombRevealed");
      if (bombElement.classList.contains("bombRevealed")) {
        mouseDownEventEmitter(bombElement);
      }
    });
  };
  useEffect(() => {
    if (arrayNumBombs.length < numGridsOption * numGridsOption) {
      arrayNumBombs.push(numBombsAround);
    }
  }, [numBombsAround]);

  const revealSurroundingEmptyCells = useCallback((x, y) => {
    if (x < 0 || x >= numGridsOption || y < 0 || y >= numGridsOption) {
      return;
    }
    for (let i = x - 1; i <= x + 1; i++) {
      if (i < 0 || i >= numGridsOption) {
        continue;
      }
      for (let j = y - 1; j <= y + 1; j++) {
        if (j < 0 || j >= numGridsOption) {
          continue;
        }
        if (i == x && j == y) {
          continue;
        }
        // Check if the cell is already revealed
        const cell = document.querySelector(`[data-pos="${i}-${j}"]`);
        if (cell.classList.contains("minesweeper-revealed")) {
          continue;
        }
        // Check if the cell is a bomb
        if (bombPositions.has(`${i}-${j}`)) {
          continue;
        }
        // Check if the cell is flagged
        if (cell.classList.contains("minesweeper-flag")) {
          continue;
        }
        if (arrayNumBombs[i * numGridsOption + j] == 0) {
          cell.classList.add("minesweeper-revealed");
          revealSurroundingEmptyCells(i, j);
          mouseDownEventEmitter(cell);
        }
        // also mouse down on the cell surrounding empty cell
        else {
          cell.classList.add("minesweeper-revealed");
          mouseDownEventEmitter(cell);
        }
      }
    }
  }, []);

  // Function to handle the click on the cell
  const handleCellClick = (e) => {
    // Activate Timer
    setTimerIsActive(true);
    // Check if the right mouse button is clicked
    if ("which" in e) {
      if (e.which == 3) {
        setIsActive(false);
        setNumBombs((prevNum) => (isFlagged ? prevNum + 1 : prevNum - 1));
        e.currentTarget.classList.toggle("minesweeper-flag");
        setIsFlagged(!isFlagged);
        return;
      }
    } else if ("button" in e) {
      if (e.button == 2) {
        setIsActive(false);
        setNumBombs((prevNum) => (isFlagged ? prevNum + 1 : prevNum - 1));
        e.currentTarget.classList.toggle("minesweeper-flag");
        setIsFlagged(!isFlagged);
        return;
      }
    }
    const [xCell, yCell] = e.currentTarget.dataset.pos.split("-").map(Number);
    if (isBomb) {
      e.currentTarget.parentElement.classList.add("pointer-events-none");
      if (!e.currentTarget.classList.contains("bombRevealed")) {
        revealAllBombs(bombPositions);
        setTimerIsActive(false);
        window.gameOver.showModal();
      }
    } else {
      if (arrayNumBombs[xCell * numGridsOption + yCell] == 0) {
        e.currentTarget.classList.add("minesweeper-revealed");
        revealSurroundingEmptyCells(xCell, yCell);
      }
      setGameScore((prevNum) => prevNum + 1);
    }
    setIsActive(true);
  };
  const faBombNum = {
    bomb: (
      <FontAwesomeIcon icon={icon({name: "bomb"})} className="text-red-500" />
    ),
    inactive: <FontAwesomeIcon icon={icon({name: "question"})} />,
    flag: (
      <FontAwesomeIcon
        icon={icon({name: "flag"})}
        className="text-yellow-500"
      />
    ),
    0: null,
    1: <FontAwesomeIcon icon={icon({name: "1"})} className="text-blue-500" />,
    2: <FontAwesomeIcon icon={icon({name: "2"})} className="text-blue-500" />,
    3: <FontAwesomeIcon icon={icon({name: "3"})} className="text-blue-500" />,
    4: <FontAwesomeIcon icon={icon({name: "4"})} className="text-blue-500" />,
    5: <FontAwesomeIcon icon={icon({name: "5"})} className="text-blue-500" />,
    6: <FontAwesomeIcon icon={icon({name: "6"})} className="text-blue-500" />,
    7: <FontAwesomeIcon icon={icon({name: "7"})} className="text-blue-500" />,
    8: <FontAwesomeIcon icon={icon({name: "8"})} className="text-blue-500" />,
  };

  return (
    <div
      className={isActive ? " minesweeper-revealed" : "minesweeper-cell"}
      onMouseDown={handleCellClick}
      data-pos={`${x}-${y}`}
    >
      {isActive
        ? isBomb
          ? faBombNum["bomb"]
          : faBombNum[numBombsAround]
        : isFlagged
        ? faBombNum["flag"]
        : faBombNum["inactive"]}
    </div>
  );
}
function Minesweeper({numBombs, setNumBombs}) {
  let gameGrid = [];
  let keyCount = 0;
  const numBombsOption = numBombsFunction();
  const numGridsOption = numGridsFunction();
  const bombPositions = useMemo(() => {
    const positions = new Set();
    while (positions.size < numBombs) {
      const x = Math.floor(Math.random() * numGridsOption);
      const y = Math.floor(Math.random() * numGridsOption);
      positions.add(`${x}-${y}`);
    }
    return positions;
  }, [numBombsOption]);

  for (let i = 0; i < numGridsOption; i++) {
    for (let j = 0; j < numGridsOption; j++) {
      const isBomb = bombPositions.has(`${i}-${j}`);
      gameGrid.push(
        <MineGrid
          key={keyCount}
          x={i}
          y={j}
          isBomb={isBomb}
          setNumBombs={setNumBombs}
          bombPositions={bombPositions}
        />
      );
      keyCount++;
    }
  }
  const style = {
    gridTemplateColumns: `repeat(${numGridsOption}, 1fr)`,
  };

  return (
    <div id="minesweeper" className="minesweeper-container p-3" style={style}>
      {gameGrid}
      <Popup popupId="gameOver" popupTitle="Game Over">
        You hit a bomb!
      </Popup>
      <Popup popupId="gameWin" popupTitle="Game Win">
        You win!
      </Popup>
    </div>
  );
}

function Header({numBombs}) {
  const {gameScore} = useContext(Context);
  const numBombsOption = numBombsFunction();
  const numGridsOption = numGridsFunction();
  const {timerIsActive, setTimerIsActive} = useContext(TimerContext);
  useEffect(() => {
    if (gameScore == numGridsOption * numGridsOption - numBombsOption) {
      document
        .getElementById("minesweeper")
        .classList.add("pointer-events-none");
      setTimerIsActive(false);
      window.gameWin.showModal();
    }
  }, [gameScore]);

  return (
    <div>
      <div className="flex place-content-between p-5">
        <Timer timerIsActive={timerIsActive} />
        <h1 className="text-white">
          Score: {gameScore.toString().padStart(3, " ")}
        </h1>
        <h1 className="text-white">
          Bomb: {numBombs.toString().padStart(3, " ")}
        </h1>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex p-3 place-content-between">
      <button
        className="btn btn-neutral"
        onClick={() => window.location.reload()}
      >
        Restart
      </button>
      <Link to="/" className="btn btn-neutral">
        <FontAwesomeIcon icon={icon({name: "turn-up"})} />
        Back
      </Link>
    </div>
  );
}

function GameContext() {
  const [gameScore, setGameScore] = useState(0);
  const [numBombs, setNumBombs] = useState(numBombsFunction());
  const [timerIsActive, setTimerIsActive] = useState(false);
  const contextValue = {gameScore, setGameScore};
  const timerContextValue = {timerIsActive, setTimerIsActive};
  return (
    <Context.Provider value={contextValue}>
      <TimerContext.Provider value={timerContextValue}>
        <Header numBombs={numBombs} />
        <Minesweeper numBombs={numBombs} setNumBombs={setNumBombs} />
        <Footer />
      </TimerContext.Provider>
    </Context.Provider>
  );
}

function Game() {
  return <GameContext />;
}

export default Game;
