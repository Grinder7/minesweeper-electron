import React from "react";
import {Link} from "react-router-dom";

function About() {
  return (
    <div className="grid place-items-center my-auto h-full">
      <div className="container p-3">
        <h1 className="text-white text-xl font-medium pb-3 text-center">
          About (ChatGPT :V)
        </h1>
        <div className="">
          Welcome to the thrilling world of Electron Minesweeper, a captivating
          game that brings together the power of Electron, the versatility of
          React, and the elegance of Tailwind CSS with DaisyUI! Prepare to
          embark on a classic adventure as you uncover hidden mines, strategize
          your moves, and test your wits.
        </div>
        <div className="font-medium py-3 text-white">
          About Electron Minesweeper:
        </div>
        <div className="">
          At its core, Electron Minesweeper is a reimagined version of the
          beloved Minesweeper game we all know and love. However, with the
          integration of Electron, React, and Tailwind CSS with DaisyUI, we've
          elevated the gaming experience to a whole new level of interactivity,
          performance, and visual appeal.
        </div>
        <div className="font-medium py-3 text-white">Key Features:</div>
        <div className="">
          <ul className="list-disc list-outside">
            <li>
              <span className="font-medium">
                Customizable Difficulty Levels:{" "}
              </span>{" "}
              Play at your own pace with customizable difficulty levels. Choose
              from a range of grid sizes and number of bombs to suit your
              preferences and skill level.
            </li>

            <li>
              <span className="font-medium">Electron-Powered: </span> Thanks to
              Electron, this game is cross-platform, meaning you can enjoy it on
              your favorite operating system, whether it's Windows, macOS, or
              Linux. Play it seamlessly without any compatibility issues!
            </li>

            <li>
              <span className="font-medium">React Enhanced Gameplay: </span>{" "}
              With React, we've introduced smooth, real-time updates to the game
              board. Experience the joy of dynamic interactions, and never miss
              a beat as you progress through your Minesweeper journey.
            </li>

            <li>
              <span className="font-medium">Tailwind CSS with DaisyUI: </span>{" "}
              Our game's interface is built with Tailwind CSS, a utility-first
              CSS framework that ensures a clean and concise codebase, resulting
              in lightning-fast performance. The integration of DaisyUI adds
              even more customization options, allowing you to tailor the visual
              aspects of the game to your liking.
            </li>
          </ul>
        </div>
        <div className="text-center py-3">
          <Link to="/" className="btn btn-outline w-24">
            back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
