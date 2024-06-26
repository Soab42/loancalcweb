import React, { useEffect, useState } from "react";
import classes from "../../styles/New.module.css";
import moment from "moment";
import { getDatabase, ref, set } from "firebase/database";
import { useAuth } from "../../auth/AuthContext";
import { app } from "../../Firebase";
import { addLoan } from "../../features/loan/loanSlice";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  useEffect(() => {
    dispatch(addLoan(props));
  }, [props, dispatch]);
  console.log(day);
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

        setServicecharge3(Math.ceil(charge));
        0 > props.openingoutstanding ||
          (props.sl === props.duration - 1 &&
            setRecoverable3(
              props.openingoutstanding + Math.ceil(servicecharge3)
            ));
        // : setRecoverable3(recoverable3);
        setPrinciple3(recoverable3 - Math.ceil(servicecharge3));
        setOutstanding3(props.openingoutstanding - principle3);
        setTotal(recoverable3 + props.total);
        setSl(props.sl + 1);
      }
      getdata();
    }
  }, [
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

  useEffect(() => {
    if (props.duration > props.sl && outstanding3 > -1) {
      const data = {
        date: date,
        day: day,
        recoverable: recoverable3,
        principle: principle3,
        servicecharge: servicecharge3,
        outstanding: outstanding3,
      };
      dispatch(addLoan(data));
      const db = getDatabase(app);
      const dataref = ref(
        db,
        currentUser.uid + "/loaninfo/" + props.id + "/passbook/" + props.sl
      );
      set(dataref, data).catch((err) => alert(`sorry! ${err}`));
    }
  }, [
    date,
    servicecharge3,
    principle3,
    recoverable3,
    currentUser,
    day,
    props.id,
    props.sl,
    props.recoverable,
    outstanding3,
    props,
    dispatch,
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
            value={Math.ceil(recoverable3)}
          />
        </td>
        <td className={classes.tablecontentdiv}>{day}</td>
        <td className={classes.tablecontentdiv}>
          {Math.ceil(principle3).toLocaleString("en-IN")}
        </td>
        <td className={classes.tablecontentdiv}>
          {Math.round(servicecharge3).toLocaleString("en-IN")}
        </td>
        <td className={classes.tablecontentdiv}>
          {Math.ceil(outstanding3).toLocaleString("en-IN")}
        </td>
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
