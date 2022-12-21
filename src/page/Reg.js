import { Facebook, Lock, Mail, People } from "@mui/icons-material";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../styles/Form.module.css";
import { useAuth } from "../auth/AuthContext";
export default function Reg() {
  const email = useRef(null);
  const password = useRef(null);
  const cpassword = useRef(null);
  const username = useRef(null);
  const { signup } = useAuth();
  const history = useNavigate();
  async function handlesubmit(e) {
    e.preventDefault();
    // do validation
    if (password.current.value !== cpassword.current.value) {
      return alert("Passwords don't match!");
    }

    try {
      await signup(
        email.current.value,
        password.current.value,
        username.current.value
      );
      history.push("/");
    } catch (err) {}
  }
  return (
    <div className={classes.main}>
      {/* animation ....................... */}
      <div
        style={{
          position: "fixed",
          bottom: "150px",
          width: "100%",
          // height: "20vh",
        }}
      >
        <svg
          class="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(25,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,155,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,55,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "46px",
          width: "100%",
          rotate: "180deg",
          // height: "20vh",
        }}
      >
        <svg
          class="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(25,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,155,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,55,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      {/* animation end................ */}

      <form onSubmit={handlesubmit} className={classes.form}>
        <h2 style={{ textAlign: "center" }}>Registration Form</h2>
        <div>
          <label>Email</label>
          <div className={classes.inpgrp}>
            <Mail />
            <input type={"email"} ref={email} className={classes.input} />
          </div>
        </div>
        <div>
          <label>PassWord</label>
          <div className={classes.inpgrp}>
            <Lock />
            <input type={"password"} ref={password} className={classes.input} />
          </div>
        </div>
        <div>
          <label>Confirm PassWord</label>
          <div className={classes.inpgrp}>
            <Lock />
            <input
              type={"password"}
              ref={cpassword}
              className={classes.input}
            />
          </div>
        </div>
        <div>
          <label>Name</label>
          <div className={classes.inpgrp}>
            <People />
            <input type={"text"} ref={username} className={classes.input} />
          </div>
        </div>
        <button className={classes.btn} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
