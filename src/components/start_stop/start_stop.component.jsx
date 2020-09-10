import React from "react";

import "./start_stop.styles.scss";

const StartStop = (props) => {
  return (
    <div>
      <div id="start_stop" onClick={props.start_stop}>
        {props.time_going ? "Pause" : "Start"}
      </div>
      <div id="reset" onClick={props.reset}>
        Reset
      </div>
    </div>
  );
};

export default StartStop;
