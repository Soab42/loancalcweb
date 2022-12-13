import React from "react";
import moment from "moment";
import { getDatabase, onValue, query, ref, remove } from "firebase/database";
import { app } from "../Firebase";
// import { async } from "@firebase/util";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Delete } from "@mui/icons-material";
// import { PrintSharp } from "@mui/icons-material";

// import { flexbox } from "@mui/system";
function Print({ children }) {
  const { id } = useParams(null);
  const [userinfo, setuserinfo] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchdata() {
      const db = getDatabase(app);
      const dataref = ref(db, currentUser.uid + "/userinfo");
      const dataquery = query(dataref);

      onValue(dataquery, (snapshot) =>
        snapshot.exists() ? setuserinfo(snapshot.val()) : null
      );
    }
    fetchdata();
  }, [id, currentUser]);

  return (
    <div style={{ minHeight: "120vh", marginBottom: "5rem" }}>
      {/* ref div start hare...................... */}
      <div style={{ margin: ".5rem" }}>
        {/* header div start here............ */}
        <div
          style={{
            width: "100%",
            textTransform: "capitalize",
            display: "grid",
            textAlign: "center",
            justifyContent: "center",
            margin: ".5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              justifySelf: "center",
            }}
          >
            <img style={{ height: "2rem" }} src="/pmk.png" alt="" />
            <div>
              <h2>Palli Mangol Karmosuchi</h2>
              <p>Zirabo,ashulia,dhaka</p>
            </div>
          </div>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              width: "96vw",
              fontSize: "large",
              paddingRight: "1rem",
            }}
          >
            <p style={{ display: "flex", gap: "1rem" }}>
              Branch Name:
              <section style={{ fontWeight: "bold" }}>
                {userinfo.branchname} ({userinfo.code})
              </section>
            </p>
            <p style={{ display: "flex", gap: "1rem" }}>
              Date:
              <section style={{ fontWeight: "bold" }}>
                {moment(Date()).format("DD-MM-yyyy")}
              </section>
            </p>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
          }}
        >
          {children}
        </div>
        {/* Footer div start here.......................... */}
      </div>
    </div>
  );
}

export default function Edit() {
  const [data, setData] = useState();
  const [dataall, setDataall] = useState([]);
  const { id } = useParams(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchdata() {
      const db = getDatabase(app);
      const dataref = ref(db, currentUser.uid + "/loaninfo/" + id);
      const dataquery = query(dataref);
      // const snapshot = await get(dataquery);

      const alldataref = ref(
        db,
        currentUser.uid + "/loaninfo/" + id + "/passbook"
      );
      // const alldataquery = query(alldataref);
      // const snapshotall = await get(alldataquery);
      onValue(alldataref, (snapshot) =>
        snapshot.exists() ? setDataall(snapshot.val()) : null
      );
      onValue(dataquery, (snapshot) =>
        snapshot.exists() ? setData(snapshot.val()) : null
      );
      // setDataall(Object.values(snapshotall.val()));
    }
    fetchdata();
  }, [id, currentUser]);

  return (
    <div>
      <Print>
        {data ? (
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                display: "grid",
                gap: ".3rem",
                width: "100%",
                gridTemplateColumns: "repeat(4,1fr)",
                textTransform: "capitalize",
              }}
            >
              <p className="hp">Member Name</p>
              <p className="hp">: {data.profile.name}</p>
              <p className="hp">Disbursement date</p>
              <p className="hp">
                : {moment(data.loan.date).format("DD-MM-YYYY")}
              </p>
              <p className="hp">Member id</p>
              <p className="hp" style={{ textTransform: "uppercase" }}>
                : {id}
              </p>
              <p className="hp">Disbursement Amount</p>
              <p className="hp">: {data.loan.openingoutstanding}</p>
              <p className="hp">interest rate</p>
              <p className="hp">: {data.loan.interestrate}%</p>
              <p className="hp">Installment amount</p>
              <p className="hp">: {data.loan.recoverable}</p>
              <p className="hp">interest indicative </p>
              <p className="hp">
                : {(Number(data.loan.interestrate) / 36500).toFixed(8)}
              </p>
              <p className="hp">Loan Duration</p>{" "}
              <p className="hp">: {data.loan.duration}</p>
            </div>
          </div>
        ) : (
          "null"
        )}
        <table style={{ width: "100%", textTransform: "capitalize" }}>
          <th className="tr">
            <td className="td">#</td>
            <td className="td">collection date</td>
            <td className="td">day</td>
            <td className="td">Installment amount</td>
            <td className="td">principle</td>
            <td className="td">service charge</td>
            <td className="td">Outstanding</td>
            <td className="td">action</td>
          </th>

          <tbody>
            {dataall.map((x, key) => {
              return (
                <tr className="tr">
                  <td className="td">{key + 1}</td>
                  <td className="td">{moment(x.date).format("DD-MM-YYYY")}</td>
                  <td className="td">{x.day}</td>
                  <td className="td">{x.recoverable}</td>
                  <td className="td">{x.principle}</td>
                  <td className="td">{x.servicecharge}</td>
                  <td className="td">{x.outstanding}</td>
                  <td
                    className="td"
                    onClick={() => {
                      const db = getDatabase(app);
                      const dataref = ref(
                        db,
                        currentUser.uid + "/loaninfo/" + id + "/passbook/" + key
                      );
                      // console.log(dataref);
                      remove(dataref);
                    }}
                  >
                    <Delete color="error" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Print>
    </div>
  );
}
