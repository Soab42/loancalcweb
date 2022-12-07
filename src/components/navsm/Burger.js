import React, { useState } from "react";
// import { Link } from "react-router-dom";

export default function Burger({ click2 }) {
  const [click, setClick] = useState(click2);
  console.log(click);
  return (
    <div
      className="burger"
      onClick={() => (!click ? setClick(true) : setClick(false))}
    >
      <div
        style={
          !click
            ? null
            : {
                rotate: "135deg",
                backgroundColor: "red",
                translate: "0px 10px",
                borderRadius: "10px",
              }
        }
        className="burger-bar"
      ></div>
      <div style={!click ? null : { scale: "0" }} className="burger-bar"></div>
      <div
        style={
          !click
            ? null
            : {
                backgroundColor: "red",
                rotate: "-132deg",
                translate: "1px -6px",
                borderRadius: "10px",
              }
        }
        className="burger-bar"
      ></div>
    </div>
  );
}
