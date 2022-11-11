import React, { useEffect, useState } from "react";
import classes from "../../styles/New.module.css";
import moment from "moment";

export default function Monthly(props) {
  const [principle3, setPrinciple3] = useState(0);
  const [servicecharge3, setServicecharge3] = useState(0);
  const [outstanding3, setOutstanding3] = useState(0);
  const [recoverable3, setRecoverable3] = useState(0);
  const [sl, setSl] = useState();
  const [date, setDate] = useState(
    moment(new Date(props.date)).format("YYYY-MM-DD")
  );

  useEffect(() => {
    async function getdata() {
      const day =
        Math.abs(
          (new Date(date) - new Date(props.date)) / (24 * 60 * 60 * 1000)
        ) + 30;

      setServicecharge3(
        ((props.openingoutstanding * (props.interestrate / 365)) / 100) * day
      );
      props.recoverable < props.openingoutstanding
        ? setRecoverable3(props.recoverable)
        : setRecoverable3(props.openingoutstanding + Math.ceil(servicecharge3));

      setPrinciple3(recoverable3 - Math.ceil(servicecharge3));
      setOutstanding3(props.openingoutstanding - principle3);

      setSl(props.sl + 1);
    }
    getdata();
  }, [
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
          {moment(props.date).format("MM-DD-YY")}
        </td>

        <input
          className={classes.tablecontentdiv}
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />

        <td className={classes.tablecontentdiv}>
          {Math.ceil(recoverable3).toLocaleString("en-IN")}
        </td>
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
              date={new Date(date).setDate(
                new Date(date).getDate() + moment(date).daysInMonth()
              )}
              interestrate={props.interestrate}
              recoverable={props.recoverable}
              openingoutstanding={outstanding3}
            />
          ) : null}
        </div>
      }
    </>
  );
}
