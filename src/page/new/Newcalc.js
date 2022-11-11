import React, { useState } from "react";
import Monthly from "./Monthly";
import moment from "moment";
import classes from "../../styles/New.module.css";
export default function Newcalc() {
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
      <div className={classes.header}>
        <div>PassBook</div>
      </div>
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
              style={{ height: "30px" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              className={classes.inputheadertopinput}
              onChange={(e) => setInterestrate(Number(e.target.value))}
              value={interestrate}
            />

            <input
              type="text"
              className={classes.inputheadertopinput}
              onChange={(number) => setRecoverable(Number(number.target.value))}
              value={recoverable}
            />

            <input
              type="text"
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
              <tr className={classes.tablecontentdiv}>#</tr>
              <tr className={classes.tablecontentdiv}>recoverable date</tr>
              <tr className={classes.tablecontentdiv}>collection date</tr>
              <tr className={classes.tablecontentdiv}>recoverable amount</tr>
              <tr className={classes.tablecontentdiv}>principle</tr>
              <tr className={classes.tablecontentdiv}>service charge</tr>
              <tr className={classes.tablecontentdiv}>Outstanding</tr>
            </thead>

            {data.map((x) => (
              <div style={{ maxHeight: "60vh", overflow: "scroll" }}>
                <Monthly
                  sl={Number(0)}
                  date={new Date(x.date).setDate(
                    new Date(x.date).getDate() + moment(x.date).daysInMonth()
                  )}
                  interestrate={x.interestrate}
                  recoverable={x.recoverable}
                  openingoutstanding={x.openingoutstanding}
                />
              </div>
            ))}
          </>
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <div onClick={datasender}>
            <div
              className={classes.generate}
              style={{ backgroundColor: "blue" }}
            >
              Calculate
            </div>
          </div>
          <div onClick={genehandle}>
            <div
              className={classes.generate}
              style={{ backgroundColor: "tomato" }}
            >
              Auto Fill
            </div>
          </div>
          <div onClick={resethandle}>
            <div
              className={classes.generate}
              style={{ backgroundColor: "red" }}
            >
              Reset
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
