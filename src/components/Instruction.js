import React, { useEffect, useState } from "react";

import classes from "../styles/Daily.module.css";
export default function Instruction() {
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(window.screen.width);
  }, [width]);
  return (
    <div className={classes.instruction}>
      <h2>Instruction For Calculation</h2>
      <p>1.Fill up all the field first.</p>
      <p>
        2.For Calculation click the calculation button. result will apear in
        {width > 500 ? " right side" : " Bottom"} area.
      </p>
      <p>
        3.Interest rate Calculation method is = (Outstanding * (Interest
        rate/365))/100 * days.
      </p>
      <p>4.Press autofill for demo fill up.</p>
      <p>5.Press reset to clear the input field .</p>
    </div>
  );
}
