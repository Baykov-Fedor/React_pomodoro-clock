import React from "react";

import "./switcher.styles.scss";

const Switcher = (props) => {
  return (
    <div className="switcher">
      <span className="switcher--label" id={`${props.id}-label`}>
        {props.name}
      </span>
      <div className="switcher--controls">
        <button
          id={`${props.id}-decrement`}
          onClick={() => props.changeLength("-", props.id)}
          className="switcher--controls--decrement-icon"
        ></button>
        <span className="switcher--controls--length" id={`${props.id}-length`}>
          {props.length}
        </span>
        <button
          id={`${props.id}-increment`}
          onClick={() => props.changeLength("+", props.id)}
          className="switcher--controls--increment-icon"
        ></button>
      </div>
    </div>
  );
};

export default Switcher;
