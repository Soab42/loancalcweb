import moment from "moment";
import React, { useState, useEffect } from "react";

import classes from "../../styles/Daily.module.css";
export default function Daily() {
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
    const service = outstanding * (rate / 365);
    const charge = (service / 100) * day;

    setServicecharge(Math.ceil(charge));
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
    setDate(moment(new Date()).format("YYYY-MM-DD"));
    setDate2(
      moment(new Date().setDate(new Date().getDate() + 30)).format("YYYY-MM-DD")
    );
  };
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontSize: "x-large",
          backgroundColor: "lightgreen",
          fontFamily: "cascadia code",
          height:"5rem",
        }}
      >
        Daily Interest Calculation
      </div>
      <div className={classes.frame}>
      <div className={classes.elements}></div>
        <div className={classes.form}>
          <label className={classes.label}>Loan Outstanding</label>
          <input
            className={classes.input}
            type="text"
            value={outstanding}
            onChange={(e) => setOutstanding(e.target.value)}
          ></input>
          <label className={classes.label}>
            Previous Month Collection Date
          </label>
          <input
            className={classes.input}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <label className={classes.label}>This Month Collection Date</label>
          <input
            className={classes.input}
            value={date2}
            type="date"
            onChange={(e) => setDate2(e.target.value)}
          ></input>
          <label className={classes.label}>Interest Rate</label>
          <input
            className={classes.input}
            value={rate}
            type="text"
            onChange={(e) => setRate(e.target.value)}
          ></input>
          <label className={classes.label}>Recoverable Amount</label>
          <input
            className={classes.input}
            value={recoverable}
            type="text"
            onChange={(e) => setRecoverable(e.target.value)}
          ></input>
          <label className={classes.label}>Loan Durtion</label>
          <input
            className={classes.input}
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          ></input>
          <div className={classes.btndiv}>
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
        {outstanding > 0
          ? results.map((x) => {
              return (
                <div className={classes.result}>
                  <label className={classes.label}>Opening balance</label>
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.outstanding}
                  />
                  <label className={classes.label}>Interest Rate</label>

                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.rate}
                  />
                  <label className={classes.label}>Calculation Day</label>
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.day}
                  />
                  <label className={classes.label}>
                    This Month service charge
                  </label>
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.servicecharge}
                  />
                  <label className={classes.label}>This month principle</label>
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.principal}
                  />
                  <label className={classes.label}>
                    This month recoverable
                  </label>
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.recoverable}
                  />
                  <label className={classes.label}>Closing balance</label>
                  <input
                    className={classes.input}
                    disabled
                    type={"text"}
                    value={x.lastoutstanding}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
