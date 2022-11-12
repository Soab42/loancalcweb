import moment from "moment";
import React, { useState, useEffect } from "react";
import Instruction from "../../components/Instruction";

import classes from "../../styles/Daily.module.css";

export default function Dailyold() {
  const [outstanding, setOutstanding] = useState(0);
  const [rate, setRate] = useState(0);
  const [recoverable, setRecoverable] = useState(0);
  const [servicecharge, setServicecharge] = useState(0);
  const [day, setDay] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [lastoutstanding, setLastoutstanding] = useState(0);
  const [results, setResults] = useState([]);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [duration, setDuration] = useState();
  useEffect(() => {
    setDay(
      Math.abs((new Date(date2) - new Date(date)) / (24 * 60 * 60 * 1000))
    );
    const service = Number(outstanding) * (rate / 360);
    const charge = (service / 100) * (day > 30 ? day : 30);
    recoverable < outstanding
      ? setRecoverable(recoverable)
      : setRecoverable(outstanding + servicecharge);

    setServicecharge(charge);
    setPrincipal(recoverable - servicecharge);
    setLastoutstanding(outstanding - principal);
  }, [
    date,
    date2,
    outstanding,
    rate,
    duration,
    day,
    principal,
    servicecharge,
    recoverable,
  ]);
  const result = () => {
    setResults([
      {
        outstanding,
        rate,
        principal,
        servicecharge,
        recoverable,
        duration,
        lastoutstanding,
        day,
      },
    ]);
  };
  const reset = () => {
    setOutstanding(0);
    setRate(0);
    setRecoverable(0);
    setDuration(0);
    setResults([]);
    setDate(0);
    setDate2(0);
  };
  const autofill = () => {
    setOutstanding(100000);
    setRate(24);
    setRecoverable(9500);
    setDuration(12);
    setDate(
      moment(new Date().setDate(new Date().getDate() - 30)).format("YYYY-MM-DD")
    );
    setDate2(moment(new Date()).format("YYYY-MM-DD"));
  };
  return (
    <div>
      <div className={classes.title}>
        <p> Daily Interest Calculation</p>
      </div>
      <div className={classes.frame}>
        <div className={classes.form}>
          <label className={classes.label}>
            Loan Outstanding
            <input
              className={classes.input}
              type="number"
              value={outstanding}
              onChange={(e) => setOutstanding(Number(e.target.value))}
            ></input>
          </label>

          <label className={classes.label}>
            Previous Collection Date
            <input
              className={classes.input}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </label>

          <label className={classes.label}>
            Todays Collection Date
            <input
              className={classes.input}
              value={date2}
              type="date"
              onChange={(e) => setDate2(e.target.value)}
            ></input>
          </label>

          <label className={classes.label}>
            Interest Rate
            <input
              className={classes.input}
              value={rate}
              type="number"
              onChange={(e) => setRate(Number(e.target.value))}
            ></input>
          </label>

          <label className={classes.label}>
            Recoverable Amount
            <input
              className={classes.input}
              value={recoverable}
              type="number"
              onChange={(e) => setRecoverable(Number(e.target.value))}
            ></input>
          </label>

          <label className={classes.label}>
            Loan Duration
            <input
              className={classes.input}
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            ></input>
          </label>
          <div className={classes.btngrp}>
            <button
              className={classes.btn}
              type="button"
              value={"Calculate"}
              onClick={result}
            >
              Calculate
            </button>
            <button
              className={classes.btn}
              type="button"
              value={"Calculate"}
              onClick={autofill}
            >
              Autofill
            </button>
            <button
              className={classes.btn}
              type="button"
              value={"Calculate"}
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
        {results.length !== 0 ? (
          results.map((x) => {
            return (
              <div className={classes.result}>
                <label className={classes.label}>
                  Opening balance{" "}
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.outstanding.toLocaleString("en-IN")}
                  />
                </label>

                <label className={classes.label}>
                  Interest Rate
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={`${x.rate}%`}
                  />
                </label>

                <label className={classes.label}>
                  Calculation Day
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.day}
                  />
                </label>

                <label className={classes.label}>
                  Principle
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.principal.toLocaleString("en-IN")}
                  />
                </label>
                <label className={classes.label}>
                  service charge
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.servicecharge.toLocaleString("en-IN")}
                  />
                </label>
                <label className={classes.label}>
                  Recoverable
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.recoverable.toLocaleString("en-IN")}
                  />
                </label>

                <label className={classes.label}>
                  Closing balance{" "}
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.lastoutstanding.toLocaleString("en-IN")}
                  />
                </label>
              </div>
            );
          })
        ) : (
          <div className={classes.result}>
            <Instruction />
          </div>
        )}
      </div>
    </div>
  );
}
