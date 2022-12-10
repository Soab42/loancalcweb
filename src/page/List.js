import { RemoveRedEye } from "@mui/icons-material";
import React, { useState } from "react";
// import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { getDatabase, onValue, query, ref } from "firebase/database";
import { useAuth } from "../auth/AuthContext";
import { app } from "../Firebase";
import { useEffect } from "react";
export default function List() {
  const [data, setData] = useState(null);
  const [key, setKey] = useState(null);
  // const { currentUser } = useAuth();
  const { currentUser } = useAuth();

  useEffect(() => {
    async function getdata() {
      const db = getDatabase(app);
      const dbref = ref(db, currentUser.uid);
      const dbquery = query(dbref);
      onValue(dbquery, (snapshot) => {
        if (snapshot.exists()) {
          setData(Object.values(snapshot.val()));
          setKey(Object.keys(snapshot.val()));
        }
      });
    }
    getdata();
  }, [currentUser]);
  useEffect(() => {});
  //   console.log(data[0].loan.date);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Calculated List</h1>
      <table style={{ justifyContent: "center" }}>
        <thead className="tr1">
          <th className="td1">sl</th>
          <th className="td1">Id</th>
          <th className="td1">Name</th>
          <th className="td1">date</th>
          <th className="td1">loan amount</th>
          <th className="td1">duration</th>
          <th className="td1">Action</th>
        </thead>
        <tbody>
          {data
            ? data.map((x, index) => {
                return (
                  <tr className="tr1">
                    <td className="td1">{index + 1}</td>
                    <td className="td1">{key[index]}</td>
                    <td className="td1">{x.profile.name}</td>
                    <td className="td1">{x.loan.date}</td>
                    <td className="td1">{x.loan.openingoutstanding}</td>
                    <td className="td1">{x.loan.duration}</td>
                    <td className="td1">
                      <Link to={`/print/${key[index]}`}>
                        <RemoveRedEye color="info" />
                      </Link>
                      {/* <Link to="/print/">
                        <Print />
                      </Link> */}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <div>{}</div>
    </div>
  );
}
