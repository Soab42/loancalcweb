import React, { useState } from "react";
// import { useAuth } from "../auth/AuthContext";

import { getDatabase, onValue, query, ref } from "firebase/database";
import { useAuth } from "../../auth/AuthContext";
import { app } from "../../Firebase";
import { useEffect } from "react";
export default function AdminPanel() {
  const [data, setData] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    function getdata() {
      const db = getDatabase(app);
      const dbref = ref(db);
      const dbquery = query(dbref);
      onValue(dbquery, (snapshot) => {
        if (snapshot.exists()) {
          setData(Object.values(snapshot.val()));
        }
      });
    }
    return getdata();
  }, [currentUser]);
  console.log(data);
  return (
    <div>
      <h1 className="admin">Admin Panel</h1>
      <div>
        <p>User Info</p>
        <table className="userTable">
          <tr>
            <td>sl</td>
            <td>Email</td>
          </tr>

          {data?.map((d, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{d.userinfo?.email}</td>
              <td>{d.userinfo?.name}</td>
              <td>{d.userinfo?.lastActive}</td>
              <td>{d.userinfo?.lastActive}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
