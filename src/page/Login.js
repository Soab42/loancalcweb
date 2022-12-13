import { Lock, Mail } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import classes from "../styles/Form.module.css";
export default function Login() {
  const [error, setError] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const { login } = useAuth();
  const history = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();

    try {
      await login(email.current.value, password.current.value);
      history.push("/");
    } catch (err) {
      console.log(err);
      setError("password don't march");
    }
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
        <div className={classes.label}>
          <h1>Sign In Here</h1>
          <label>Email</label>
          <div className={classes.inpgrp}>
            <Mail />
            <input
              type={"email"}
              ref={email}
              required
              className={classes.input}
            />
          </div>
        </div>
        <div className={classes.label}>
          <label>PassWord</label>
          <div className={classes.inpgrp}>
            <Lock />
            <input
              type={"password"}
              ref={password}
              className={classes.input}
              required
            />
          </div>
        </div>

        <button className={classes.btn} type="submit">
          Login
        </button>
        <div style={{ textTransform: "capitalize" }}>
          {error ? (
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          ) : null}
        </div>
        <p>
          Dont have an account?{" "}
          <Link style={{ color: "seagreen", fontWeight: "bolder" }} to={"/reg"}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
