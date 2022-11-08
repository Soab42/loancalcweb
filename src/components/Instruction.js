import React from "react";
import classes from "../styles/Daily.module.css";
export default function Instruction() {
  return (
    <div className={classes.instruction}>
      <h2>Instruction For Calculation</h2>
      <p>1.Fill up all the field first.</p>
      <p>
        2.For Calculation click the calculaton button. result will apear in
        right side area.
      </p>
      <p>
        3.Interest rate Calculation function is = Outstanding * (Interest
        rate/365) * days.
      </p>
      <p>4.Press autofill for demo fill up.</p>
      <p>5.Press reset to clear the input field .</p>
    </div>
  );
}
