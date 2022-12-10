import { useAuth } from "../auth/AuthContext";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { app } from "../Firebase";
import classes from "../styles/Layout.module.css";

export default function Nav() {
  const { currentUser } = useAuth();
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
        <NavLink className={classes.link} to="/list">
          List
        </NavLink>
      </nav>
      {!currentUser ? (
        <Link to={"login"}>Login</Link>
      ) : (
        <div>
          <h1>{currentUser.displayName}</h1>
          <Link to="logout">Logout</Link>
        </div>
      )}
    </div>
  );
}
