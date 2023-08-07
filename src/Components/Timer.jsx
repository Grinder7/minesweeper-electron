import React, {useEffect, useState} from "react";

function Timer({timerIsActive = true, timerIsPaused = false}) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    let interval = null;
    if (timerIsActive && timerIsPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerIsActive, timerIsPaused]);

  return (
    <div className="timer">
      <span className="digits">{("0" + Math.floor(time / 60)).slice(-2)}:</span>
      <span className="digits">{("0" + Math.floor(time % 60)).slice(-2)}</span>
    </div>
  );
}

export default Timer;
