import React, { useState } from "react";
import Monthly from "./Monthly";
import moment from "moment";
import classes from "../../styles/New.module.css";

export default function Oldcalc() {
  const [interestrate, setInterestrate] = useState(0);
  const [openingoutstanding, setopeningOutstanding] = useState(0);
  const [recoverable, setRecoverable] = useState(0);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const datasender = () => {
    setData([{ date, interestrate, openingoutstanding, recoverable }]);
  };
  const genehandle = () => {
    setDate(moment(new Date()).format("YYYY-MM-DD"));
    setInterestrate(24);
    setRecoverable(9500);
    setopeningOutstanding(100000);
  };
  const resethandle = () => {
    setInterestrate(0);
    setRecoverable(0);
    setopeningOutstanding(0);
    setData([]);
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>PassBook</div>
      <div className={classes.table}>
        <div>
          <div className={classes.tableheader}>
            <div className={classes.inputheadertop} style={{ height: "30px" }}>
              Disburse Date
            </div>
            <div className={classes.inputheadertop}>interest Rate</div>
            <div className={classes.inputheadertop}>recoverable amount</div>
            <div className={classes.inputheadertop}>Opening Outstanding</div>
          </div>
          <div className={classes.tableheader}>
            <input
              className={classes.inputheadertopinput}
              type="date"
              style={{ height: "30px", fontFamily: "jura" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="number"
              className={classes.inputheadertopinput}
              onChange={(e) => setInterestrate(Number(e.target.value))}
              value={interestrate}
            />

            <input
              type="number"
              className={classes.inputheadertopinput}
              onChange={(number) => setRecoverable(Number(number.target.value))}
              value={recoverable}
            />

            <input
              type="number"
              className={classes.inputheadertopinput}
              onChange={(number) =>
                setopeningOutstanding(Number(number.target.value))
              }
              value={openingoutstanding}
            />
          </div>
        </div>

        {openingoutstanding > 0 ? (
          <>
            <thead className={classes.contenttableheader}>
              <tr className={classes.tablecontent}>#</tr>
              <tr className={classes.tablecontent}>collection date</tr>
              <tr className={classes.tablecontent}>recoverable amount</tr>
              <tr className={classes.tablecontent}>day</tr>
              <tr className={classes.tablecontent}>principle</tr>
              <tr className={classes.tablecontent}>service charge</tr>
              <tr className={classes.tablecontent}>Outstanding</tr>
            </thead>

            {data.map((x) => (
              <div style={{ maxHeight: "57.2vh", overflow: "scroll" }}>
                <Monthly
                  sl={Number(0)}
                  date={x.date}
                  interestrate={x.interestrate}
                  recoverable={x.recoverable}
                  openingoutstanding={x.openingoutstanding}
                />
              </div>
            ))}
          </>
        ) : null}

        <div className={classes.btngroup}>
          <div onClick={datasender} className={classes.generate}>
            Calculate
          </div>

          <div onClick={genehandle} className={classes.generate}>
            Auto Fill
          </div>

          <div onClick={resethandle} className={classes.generate}>
            Reset
          </div>
        </div>
      </div>
    </div>
  );
}
