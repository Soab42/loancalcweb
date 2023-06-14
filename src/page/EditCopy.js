import React, { useEffect, useState } from "react";
import moment from "moment";
import classes from "../styles/New.module.css";
import { useAuth } from "../auth/AuthContext";
import { app } from "../Firebase";
import { getDatabase, onValue, query, ref } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { addLoan, addLoanRecoverableAll } from "../features/loan/loanSlice";
import { useDispatch, useSelector } from "react-redux";
import Monthly from "./MonthlyEdit";

export default function Oldcalc() {
  const [data, setData] = useState();
  const [dataall, setDataall] = useState([]);
  const { id } = useParams(null);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLoan = useSelector((state) => state.loan.loanData);
  const getRecoverable = useSelector((state) => state.loan.loanRecoverable);

  useEffect(() => {
    async function fetchData() {
      const db = getDatabase(app);
      const dataRef = ref(db, currentUser.uid + "/loaninfo/" + id);
      const dataQuery = query(dataRef);

      const allDataRef = ref(
        db,
        currentUser.uid + "/loaninfo/" + id + "/passbook"
      );

      onValue(allDataRef, (snapshot) =>
        snapshot.exists() ? setDataall(snapshot.val()) : null
      );
      onValue(dataQuery, (snapshot) =>
        snapshot.exists() ? setData(snapshot.val()) : null
      );
    }
    fetchData();
  }, [id, currentUser, dispatch]);

  useEffect(() => {
    dispatch(addLoan(data?.loan));
    dispatch(addLoanRecoverableAll(dataall));
  }, [data, dataall, dispatch]);
  // console.log(dataall);

  return (
    <div className={classes.main}>
      <div className={classes.header}>Manual Calculation PassBook</div>

      <div className={classes.table}>
        <div>
          <div className={classes.tableheader}>
            <div className={classes.inputheadertop}>Disburse Date</div>
            <div className={classes.inputheadertop}>interest Rate</div>
            <div className={classes.inputheadertop}>Loan Duration</div>
            <div className={classes.inputheadertop}>Installment amount</div>
            <div className={classes.inputheadertop}>Opening Outstanding</div>
          </div>
          <div className={classes.tableheader}>
            <input
              className={classes.inputheadertopinput}
              type="date"
              style={{ height: "30px", fontFamily: "Jura" }}
              value={getLoan?.date}
              disabled
            />
            <input
              type="number"
              className={classes.inputheadertopinput}
              value={getLoan?.interestrate}
              disabled
            />
            <input
              type="number"
              className={classes.inputheadertopinput}
              disabled
              value={getLoan?.duration}
            />
            <input
              type="number"
              className={classes.inputheadertopinput}
              disabled
              value={getLoan?.recoverable}
            />

            <input
              type="number"
              className={classes.inputheadertopinput}
              disabled
              value={getLoan?.openingoutstanding}
            />
          </div>
        </div>
        <table>
          <thead className={classes.contenttableheader}>
            <tr className={classes.tablecontent}>#</tr>
            <tr className={classes.tablecontent}>collection date</tr>
            <tr className={classes.tablecontent}>Installment amount</tr>
            <tr className={classes.tablecontent}>day</tr>
            <tr className={classes.tablecontent}>principle</tr>
            <tr className={classes.tablecontent}>service charge</tr>
            <tr className={classes.tablecontent}>Outstanding</tr>
          </thead>
          <tbody style={{ maxHeight: "57vh", overflow: "scroll" }}>
            {getRecoverable?.map((x, key) => (
              <Monthly
                sl={x.sl}
                date={x.date}
                previousDate={x.previousDate}
                interestrate={getLoan?.interestrate}
                outstanding={x.outstanding}
                recoverable={x.recoverable}
                principle={x.principle}
                openingoutstanding={x.openingoutstanding}
                servicecharge={x.servicecharge}
                total={0}
              />
            ))}
          </tbody>
        </table>

        <div className={classes.btngroup}>
          <div onClick={() => ""} className={classes.generate}>
            Update
          </div>
        </div>
      </div>
    </div>
  );
}
