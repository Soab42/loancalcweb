// import { blue } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
// import Burger from "./Burger";
// import Menu from "./Menu";
import "./nav.css";
import useClick from "./useClick";

export default function Nav() {
  const { click, Clicked } = useClick();
  const { currentUser } = useAuth();
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
          {/* <Burger click2={click} /> */}
          <div className="burger" onClick={Clicked}>
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
            <div
              style={!click ? null : { scale: "0" }}
              className="burger-bar"
            ></div>
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
        </div>
      </div>

      <div style={{}}>
        <div
          className="menu"
          style={
            !click
              ? {
                  translate: "-120% 0%",
                  width: 0,
                  overflow: "hidden",
                  scale: 1.5,
                  backgroundColor: "black",
                }
              : { translate: "0 0" }
          }
        >
          {!currentUser ? null : (
            <Link className="link" to="/list" onClick={Clicked}>
              {currentUser.displayName}
            </Link>
          )}
          <Link className="link" to="/" onClick={Clicked} end>
            Daily
          </Link>

          {/* <Link className="link" to="/new">
        Calculation
      </Link> */}
          <Link className="link" to="/old" onClick={Clicked}>
            PassBook
          </Link>
          <Link className="link" to="/list" onClick={Clicked}>
            List
          </Link>
          {currentUser ? (
            <Link className="link" to="/logout" onClick={Clicked}>
              Logout
            </Link>
          ) : (
            <Link className="link" to="/login" onClick={Clicked}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
