import React from "react";

import "./timer.styles.scss";

const Timer = (props) => {
  return (
    <div className="timer">
      <span id="timer-label">{props.sessionPlaying ? "Session" : "Break"}</span>
      <span id="time-left">{props.time()}</span>
    </div>
  );
};

export default Timer;
