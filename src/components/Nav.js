import { useAuth } from "../auth/AuthContext";
import React from "react";
import { Link, NavLink } from "react-router-dom";

import classes from "../styles/Layout.module.css";
import { Person2Outlined } from "@mui/icons-material";
import useClick from "./navsm/useClick";
import { useState } from "react";

export default function Nav() {
  const { currentUser } = useAuth();
  const [click, setClick] = useState(false);
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
      <div className={classes.userdiv}>
        {!currentUser ? (
          <div className={classes.user}>
            <NavLink className={classes.display} to={"login"}>
              Login
            </NavLink>
          </div>
        ) : (
          <div className={classes.user}>
            <h1
              className={classes.display}
              onClick={() => (!click ? setClick(true) : setClick(false))}
            >
              <Person2Outlined fontSize="large" className={classes.userlogo} />

              <div
                className={classes.dropmenu}
                style={{ scale: !click ? "0" : "1" }}
              >
                <Link
                  to="logout"
                  className={classes.droplist}
                  onClick={() => (!click ? setClick(true) : setClick(false))}
                >
                  Logout
                </Link>{" "}
                <Link
                  to="profile"
                  className={classes.droplist}
                  onClick={() => (!click ? setClick(true) : setClick(false))}
                >
                  Profile
                </Link>
              </div>
            </h1>
            <div> {currentUser.displayName}</div>
            {/* <Link to="logout">Logout</Link> */}
          </div>
        )}
      </div>
    </div>
  );
}
