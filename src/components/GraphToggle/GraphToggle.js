import React from "react";
import classes from "./GraphToggle.module.css";

const graphToggle = (props) => {
  return (
    <div className={classes.GraphToggle}>
      <label>
        <input
          type="radio"
          value="Line"
          checked={props.selectedOption === "line"}
          onChange={() => props.graphHandler("line")}
        />
        Line
      </label>
      <label>
        <input
          type="radio"
          value="Bar"
          checked={props.selectedOption === "bar"}
          onChange={() => props.graphHandler("bar")}
        />
        Bar
      </label>
    </div>
  );
};

export default graphToggle;
