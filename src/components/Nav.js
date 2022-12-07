import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "../styles/Layout.module.css";
export default function Nav() {
  return (
    <div className={classes.nav}>
      <logo className={classes.logo}>
        <Link to="/">loan calc</Link>
      </logo>
      <nav className={classes.navbtn}>
        <NavLink className={classes.link} to="/">
          Daily
        </NavLink>

        {/* <NavLink className={classes.link} to="/new">
          calc
        </NavLink> */}
        <NavLink className={classes.link} to="/old">
          PassBook
        </NavLink>
      </nav>
    </div>
  );
}
