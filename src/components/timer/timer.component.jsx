import React from "react";

import "./timer.styles.scss";

const Timer = (props) => {
  return (
    <div className="timer">
      <h2 id="timer-label">{props.sessionPlaying ? "Session" : "Break"}</h2>
      <span id="time-left">{`${props.minutes}:${props.seconds}`}</span>
    </div>
  );
};

export default Timer;
