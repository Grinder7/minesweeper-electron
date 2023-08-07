import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Popup from "../Components/Popup.jsx";

const getNumBombs = () => {
  return parseInt(localStorage.getItem("numBombsOption"), 10) || 10;
};
const getNumGrids = () => {
  return parseInt(localStorage.getItem("numGridsOption"), 10) || 10;
};

const isInt = (n) => {
  return n % 1 === 0;
};

const Options = () => {
  const [numBombsOption, setNumBombs] = useState(getNumBombs());
  const [numGridsOption, setNumGrids] = useState(getNumGrids());
  let maxNumBombsOption = Math.ceil(numGridsOption * numGridsOption * 0.5);
  let minNumBombsOption = Math.ceil(numGridsOption * numGridsOption * 0.1);
  const maxNumGridsOption = 15;
  const minNumGridsOption = 5;
  // Function to handle value changes in the input
  const handleOnChange = (e) => {
    const {id, value} = e.target;
    if (isNaN(value) || !isInt(value)) {
      return;
    }
    if (id == "numGridInput") {
      if (value >= minNumGridsOption && value <= maxNumGridsOption) {
        localStorage.setItem("numGridsOption", value);
        setNumGrids(value);
        // Update the max and min number of bombs
        const numGrids = value;
        maxNumBombsOption = Math.ceil(numGrids * numGrids * 0.5);
        minNumBombsOption = Math.ceil(numGrids * numGrids * 0.1);
        // Check if the number of bombs is valid
        if (numBombsOption > maxNumBombsOption) {
          setNumBombs(maxNumBombsOption);
          localStorage.setItem("numBombsOption", maxNumBombsOption);
        } else if (numBombsOption < minNumBombsOption) {
          setNumBombs(minNumBombsOption);
          localStorage.setItem("numBombsOption", minNumBombsOption);
        }
      } else {
        setNumGrids(
          value < minNumGridsOption ? minNumGridsOption : maxNumGridsOption
        );
        localStorage.setItem(
          "numGridsOption",
          value < minNumGridsOption ? minNumGridsOption : maxNumGridsOption
        );
        window.gridsValuePopup.showModal();
      }
    } else if (id == "numBombInput") {
      if (value >= minNumBombsOption && value <= maxNumBombsOption) {
        localStorage.setItem("numBombsOption", value);
        setNumBombs(value);
      } else {
        setNumBombs(
          value < minNumBombsOption ? minNumBombsOption : maxNumBombsOption
        );
        localStorage.setItem(
          "numBombsOption",
          value < minNumBombsOption ? minNumBombsOption : maxNumBombsOption
        );
        window.bombsValuePopup.showModal();
      }
    }
  };
  return (
    <div className="h-full w-full grid place-content-center">
      <h1 className="text-center text-xl font-medium">Options</h1>
      <form className="form-control">
        <label className="label">Grid:</label>
        <input
          id="numGridInput"
          type="number"
          className="input input-bordered"
          value={numGridsOption}
          onChange={handleOnChange}
        ></input>
        <label className="label mt-3">Bomb:</label>
        <input
          id="numBombInput"
          type="number"
          className="input input-bordered"
          value={numBombsOption}
          onChange={handleOnChange}
        ></input>
      </form>
      <Popup popupId="gridsValuePopup" popupTitle="Invalid Grid Input">
        <p className="text-center">
          Please enter a value between {minNumGridsOption} and{" "}
          {maxNumGridsOption}
        </p>
      </Popup>
      <Popup popupId="bombsValuePopup" popupTitle="Invalid Bomb Input">
        <p className="text-center">
          Please enter a value between {minNumBombsOption} and{" "}
          {maxNumBombsOption}
        </p>
      </Popup>
      <Link to="/" className="btn btn-neutral mt-3">
        Back
      </Link>
    </div>
  );
};
export default Options;
