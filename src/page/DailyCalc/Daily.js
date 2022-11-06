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
  const [finalservicecharge, setFinalservicecharge] = useState([]);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [duration, setDuration] = useState();
  useEffect(() => {
    setDay(
      Math.abs((new Date(date2) - new Date(date)) / (24 * 60 * 60 * 1000))
    );
    const service = outstanding * (rate / (30.417 * duration));
    const charge = (service / 100) * day;
    console.log(duration);
    setServicecharge(charge.toFixed(2));
  }, [date, date2, outstanding, rate, duration, day]);
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontSize: "x-large",
          backgroundColor: "lightgreen",
          fontFamily: "cascadia code",
        }}
      >
        Daily Interest Calculation
      </div>
      <div className={classes.form}>
        <label className={classes.label}>Loan Outstanding</label>
        <input
          className={classes.input}
          type="text"
          onChange={(e) => setOutstanding(e.target.value)}
        ></input>
        <label className={classes.label}>Previous Month Collection Date</label>
        <input
          className={classes.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <label className={classes.label}>This Month Collection Date</label>
        <input
          className={classes.input}
          type="date"
          onChange={(e) => setDate2(e.target.value)}
        ></input>
        <label className={classes.label}>Interest Rate</label>
        <input
          className={classes.input}
          type="text"
          onChange={(e) => setRate(e.target.value)}
        ></input>
        <label className={classes.label}>Recoverable Amount</label>
        <input
          className={classes.input}
          type="text"
          onChange={(e) => setRecoverable(e.target.value)}
        ></input>
        <label className={classes.label}>Loan Durtion</label>
        <input
          className={classes.input}
          type="text"
          onChange={(e) => setDuration(e.target.value)}
        ></input>
        <button className={classes.btn} type="button" value={"Calculate"}>
          Calculate
        </button>
      </div>
      <div className={classes.result}>
        <label className={classes.label}>Opening balance</label>
        <input
          className={classes.input}
          disabled
          type={"text"}
          value={outstanding}
        />
        <label className={classes.label}>Interest Rate</label>

        <input className={classes.input} disabled type={"text"} value={rate} />
        <label className={classes.label}>Calculation Day</label>
        <input className={classes.input} disabled type={"text"} value={day} />
        <label className={classes.label}>This Month service charge</label>
        <input
          className={classes.input}
          disabled
          type={"text"}
          value={servicecharge}
        />
        <label className={classes.label}>This month principle</label>
        <input
          className={classes.input}
          disabled
          type={"text"}
          value={recoverable - servicecharge}
        />
        <label className={classes.label}>This month recoverable</label>
        <input
          className={classes.input}
          disabled
          type={"text"}
          value={servicecharge + principal}
        />
        <label className={classes.label}>Closing balance</label>
        <input
          className={classes.input}
          disabled
          type={"text"}
          value={outstanding - recoverable + servicecharge}
        />
      </div>
    </div>
  );
}
