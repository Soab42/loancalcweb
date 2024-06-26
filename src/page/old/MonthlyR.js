import React, { useEffect, useState } from "react";
import classes from "../../styles/New.module.css";
import moment from "moment";

import { addLoan, addLoanRecoverable } from "../../features/loan/loanSlice";
import { useDispatch, useSelector } from "react-redux";
// import { InsertDriveFile } from "@mui/icons-material";

export default function Monthly(props) {
  const [principle3, setPrinciple3] = useState(0);
  const [servicecharge3, setServicecharge3] = useState(0);
  const [outstanding3, setOutstanding3] = useState(0);
  const [recoverable3, setRecoverable3] = useState(Number(props.recoverable));
  const [total, setTotal] = useState(props.total);
  const [sl, setSl] = useState(1);
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(
    moment(
      new Date(props.date).setDate(
        new Date(props.date).getDate() + moment(props.date).daysInMonth()
      )
    ).format("YYYY-MM-DD")
  );
  const loanDuration = useSelector((state) => state.loan.loanData.duration);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.openingoutstanding > 0) {
      function getdata() {
        setDay(
          Math.abs(
            (new Date(date) - new Date(props.date)) / (24 * 60 * 60 * 1000)
          )
        );
        const service =
          Number(props.openingoutstanding) * (props.interestrate / 365);
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
      dispatch(
        addLoanRecoverable({
          date: date,
          day: day,
          openingoutstanding: Number(props.openingoutstanding.toFixed(0)),
          previousDate: props.date,
          recoverable: Number(recoverable3.toFixed(0)),
          principle: Number(principle3.toFixed(2)),
          servicecharge: Number(servicecharge3.toFixed(2)),
          outstanding: Number(outstanding3.toFixed(0)),
          sl: Number(props.sl),
        })
      );
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
    props.recoverable,
    props.interestrate,
  ]);

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

        <td className={classes.tablecontentdiv}>
          <input
            type={"number"}
            style={{
              textAlign: "center",
              backgroundColor: "transparent",
              outline: "none",
              fontWeight: "bold",
              fontFamily: "jura",
              fontSize: "inherit",
              border: "none",
            }}
            onChange={(e) => setRecoverable3(Number(e.target.value))}
            value={recoverable3.toFixed(0)}
          />
        </td>
        <td className={classes.tablecontentdiv}>{day}</td>
        <td className={classes.tablecontentdiv}>{principle3.toFixed(2)}</td>
        <td className={classes.tablecontentdiv}>{servicecharge3.toFixed(2)}</td>
        <td className={classes.tablecontentdiv}>{outstanding3.toFixed(0)}</td>
      </tr>

      {
        <div>
          {outstanding3 > 0 ? (
            <Monthly
              sl={sl}
              id={props.id}
              date={new Date(date).setDate(new Date(date).getDate())}
              interestrate={props.interestrate}
              recoverable={Number(props.recoverable)}
              openingoutstanding={outstanding3}
              duration={props.duration}
              total={Number(total)}
            />
          ) : null}
        </div>
      }
    </>
  );
}
