import React from "react";
import { Link } from "react-router-dom";
import Burger from "./Burger";
import Menu from "./Menu";
import "./nav.css";
import useClick from "./useClick";

export default function Nav() {
  const { click, Clicked } = useClick();
  return (
    <div className="nav">
      <div className="logoicon">
        <Link to="/">
          <div className="logo">
            <h1>Loan Calc</h1>
          </div>
        </Link>
      </div>
      <div className="menubtn">
        <div onClick={Clicked}>
          <Burger />
        </div>
      </div>

      <div>
        <Menu style={!click ? { translate: "120% 0" } : { translate: "0 0" }} />
      </div>
    </div>
  );
}
