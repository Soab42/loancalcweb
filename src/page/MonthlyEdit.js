import React, { useEffect, useState } from "react";
import classes from "../styles/New.module.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateLoanRecoverable } from "../features/loan/loanSlice";

export default function Monthly(props) {
  const [principle3, setPrinciple3] = useState(0);
  const [servicecharge3, setServicecharge3] = useState(0);
  const [outstanding3, setOutstanding3] = useState(0);
  const [recoverable3, setRecoverable3] = useState(props.recoverable);
  const [sl, setSl] = useState(props.sl);
  const [day, setDay] = useState(0);
  const [total, setTotal] = useState(props.total);
  const dispatch = useDispatch();
  const [date, setDate] = useState(props.date);
  // console.log(props.previousDate);
  useEffect(() => {
    if (props.openingoutstanding > 0) {
      function getdata() {
        setDay(
          (new Date(date) - new Date(props.previousDate)) /
            (24 * 60 * 60 * 1000)
        );
        const service =
          Number(props.openingoutstanding) * (props.interestrate / 365);
        // console.log(day);
        const charge = (service / 100) * day;

        setServicecharge3(charge);
        0 > props.openingoutstanding ||
          (props.sl === props.duration - 1 &&
            setRecoverable3(props.openingoutstanding + servicecharge3));
        // : setRecoverable3(recoverable3);
        setPrinciple3(recoverable3 - servicecharge3);
        setOutstanding3(props.openingoutstanding - principle3);
        setTotal(recoverable3 + props.total);
        setSl(props.sl + 1);
      }
      getdata();
    }
  }, [
    dispatch,
    outstanding3,
    props.total,
    props.duration,
    day,
    props.sl,
    date,
    servicecharge3,
    principle3,
    recoverable3,
    props.openingoutstanding,
    props.date,
    props.previousDate,
    props.recoverable,
    props.interestrate,
  ]);
  useEffect(() => {
    dispatch(
      updateLoanRecoverable({
        date: date,
        previousDate: props?.previousDate,
        day: day,
        recoverable: Number(recoverable3.toFixed(0)),
        openingoutstanding: Number(props?.openingoutstanding.toFixed(0)),
        principle: Number(principle3.toFixed(2)),
        servicecharge: Number(servicecharge3.toFixed(2)),
        outstanding: Number(outstanding3.toFixed(0)),
        sl: Number(props?.sl),
      })
    );
  }, [date]);
  return (
    <>
      <tr className={classes.contenttableheader}>
        <tr className={classes.tablecontentdiv}>{sl}</tr>
        <td className={classes.tablecontentdiv}>
          <input
            type="date"
            style={
              window.screen.width < 500
                ? {
                    fontSize: "10px",
                    border: "none",
                    fontWeight: "bold",
                    outline: "none",
                    fontFamily: "jura",
                    letterSpacing: "-.9px",
                    backgroundColor: "transparent",
                  }
                : {
                    fontWeight: "normal",
                    fontSize: "inherit",
                    border: "none",
                    fontFamily: "jura",
                    outline: "none",
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "transparent",
                  }
            }
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </td>

        <td className={classes.tablecontentdiv}>{Math.ceil(recoverable3)}</td>
        <td className={classes.tablecontentdiv}>{day}</td>
        <td className={classes.tablecontentdiv}>{principle3.toFixed(2)}</td>
        <td className={classes.tablecontentdiv}>
          {Math.round(servicecharge3.toFixed(2)).toLocaleString("en-IN")}
        </td>
        <td className={classes.tablecontentdiv}>
          {Math.ceil(outstanding3.toFixed(0)).toLocaleString("en-IN")}
        </td>
      </tr>
    </>
  );
}
