import React from "react";

import "./timer.styles.scss";

const Timer = (props) => {
  return (
    <div className="timer">
      <h1 id="timer-label">{props.sessionPlaying ? "Session" : "Break"}</h1>
      <h1 id="time-left">{props.time()}</h1>
    </div>
  );
};

export default Timer;
