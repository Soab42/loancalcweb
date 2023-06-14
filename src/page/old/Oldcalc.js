import React, { useRef, useState } from "react";
import MonthlyR from "./MonthlyR";
import moment from "moment";
import classes from "../../styles/New.module.css";
import { useAuth } from "../../auth/AuthContext";
import { app } from "../../Firebase";
import { getDatabase, ref, set, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { addLoan } from "../../features/loan/loanSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Oldcalc() {
  const [interestrate, setInterestrate] = useState(0);
  const [openingoutstanding, setopeningOutstanding] = useState(0);
  const [recoverable, setRecoverable] = useState(0);
  const [duration, setDuration] = useState(0);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [show, setShow] = useState(false);
  //loan information
  const idref = useRef(null);
  const nameref = useRef(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const getLoan = useSelector((state) => state.loan);
  const dispatch = useDispatch();
  // console.log(currentUser.uid);
  // const id = !idref.current.value ? "null" : idref.current.value;
  const datasender = () => {
    setData([
      { date, interestrate, openingoutstanding, recoverable, duration },
    ]);
    dispatch(
      addLoan({ date, interestrate, openingoutstanding, recoverable, duration })
    );
  };
  const genehandle = () => {
    setDate(moment(new Date()).format("YYYY-MM-DD"));
    setInterestrate(24);
    setDuration(12);
    setRecoverable(9500);
    setopeningOutstanding(100000);
  };
  const resethandle = () => {
    // const db = getDatabase(app);
    // const datas = {
    //   date,
    //   interestrate,
    //   openingoutstanding,
    //   recoverable,
    //   duration,
    // };
    // const dataref = ref(
    //   db,
    //   currentUser.uid + "/loaninfo/" + idref.current.value + "/loan"
    // );
    // idref.current.value = null;
    // nameref.current.value = null;
    // update(dataref, datas)
    //   .then(navigate("/list"))
    //   .catch((err) => alert(`sorry! ${err}`));
    // setShow(true);
    setInterestrate(0);
    setDuration(0);
    setRecoverable(0);
    setopeningOutstanding(0);
    // setDuration(12);
    setData([]);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    const db = getDatabase(app);
    // member information
    const data = {
      profile: { id: idref.current.value, name: nameref.current.value },
    };

    // reference for create loan
    const loanDataRef2 = ref(
      db,
      currentUser.uid + "/loaninfo/" + idref.current.value + "/loan"
    );
    set(loanDataRef2, getLoan?.loanData).catch((err) => alert(`sorry! ${err}`));

    // reference for create member id register

    const memberDataRef = ref(
      db,
      currentUser.uid + "/loaninfo/" + idref.current.value
    );
    update(memberDataRef, data)
      .then()
      .catch((err) => alert(`sorry! ${err}`));

    // reference for Loan Recoverable list
    const recoverableDataRef = ref(
      db,
      currentUser.uid + "/loaninfo/" + idref.current.value + "/passbook/"
    );
    set(recoverableDataRef, getLoan?.loanRecoverable)
      .then(navigate("/list"))
      .catch((err) => alert(`sorry! ${err}`));

    setShow(false);
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>Manual Calculation PassBook</div>
      <div className="modalbg" style={{ display: !show ? "none" : "flex" }}>
        <form className="modal" onSubmit={handlesubmit}>
          <h3>Member Information</h3>
          <label>
            <p>Member Name</p>
            <input ref={nameref} type={"text"} required />
          </label>
          <label>
            <p>Member Id</p>
            <input ref={idref} type={"number"} required />
          </label>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
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
              onChange={(e) => setDuration(Number(e.target.value))}
              value={duration}
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
              {data.map((x) => (
                <MonthlyR
                  id={idref.current.value}
                  sl={Number(0)}
                  date={x.date}
                  interestrate={x.interestrate}
                  duration={Number(x.duration)}
                  recoverable={x.recoverable}
                  openingoutstanding={x.openingoutstanding}
                  total={0}
                />
              ))}
            </tbody>
          </table>
        ) : null}

        <div className={classes.btngroup}>
          <div onClick={datasender} className={classes.generate}>
            Calculate
          </div>

          <div onClick={genehandle} className={classes.generate}>
            Auto Fill
          </div>

          <div onClick={resethandle} className={classes.generate}>
            {/* Submit */}
            Reset
          </div>
          <div onClick={() => setShow(true)} className={classes.generate}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}
