import { DeleteForever, NoteAlt, RemoveRedEye } from "@mui/icons-material";
import React, { useState } from "react";
// import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, onValue, query, ref, remove } from "firebase/database";
import { useAuth } from "../auth/AuthContext";
import { app } from "../Firebase";
import { useEffect } from "react";
// import Edit from "./Edit";
export default function List() {
  const [data, setData] = useState(null);
  const [key, setKey] = useState(null);
  const { currentUser } = useAuth();
  // const { currentUser } = useAuth();
  // const [show, setShow] = useState(true);
  const navigate = useNavigate();
  // console.log(currentUser);
  useEffect(() => {
    function getdata() {
      const db = getDatabase(app);
      const dbref = ref(db, currentUser.uid + "/loaninfo");
      const dbquery = query(dbref);
      onValue(dbquery, (snapshot) => {
        if (snapshot.exists()) {
          setData(Object.values(snapshot.val()));
          setKey(Object.keys(snapshot.val()));
        }
      });
    }
    return getdata();
  }, [currentUser]);
  return data ? (
    <div style={{ textAlign: "center" }}>
      <h1>Calculated List</h1>

      <table>
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
            ? data?.map((x, index) => {
                return (
                  <tr className="tr1">
                    <td className="td1">{index + 1}</td>
                    <td className="td1">{key[index]}</td>
                    <td className="td1">{x?.profile?.name}</td>
                    <td className="td1">{x?.loan?.date}</td>
                    <td className="td1">{x?.loan?.openingoutstanding}</td>
                    <td className="td1">{x?.loan?.duration}</td>
                    <td className="td1">
                      {x?.loan?.date && (
                        <Link to={`/print/${key[index]}`}>
                          <RemoveRedEye color="info" />
                        </Link>
                      )}
                      {x.loan?.date && (
                        <Link to={`/edit/${key[index]}`}>
                          <NoteAlt color="success" />
                        </Link>
                      )}
                      <Link>
                        <div
                          onClick={() => {
                            const db = getDatabase(app);
                            const dbref = ref(
                              db,
                              currentUser.uid + "/loaninfo/" + key[index]
                            );
                            remove(dbref).then(
                              () => index === 0 && navigate("/old")

                              // setData(null);
                            );
                          }}
                        >
                          <DeleteForever color="error" />
                        </div>
                      </Link>
                      {/* <div
                          className="modalbg"
                          style={{ display: !show ? "none" : "flex" }}
                        >
                          <form className="modal">
                            <h3>Are you sure Want to Delete?</h3>
  
                            <button
                              type="submit"
                              className="btn"
                              onClick={handlesubmit}
                            >
                              <Check />
                              ok
                            </button>
                            <button
                              type="submit"
                              className="btn"
                              onClick={() => setShow(false)}
                            >
                              <Cancel />
                              Cancel
                            </button>
                          </form>
                        </div> */}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <div>{}</div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <span style={{ fontSize: "4rem", textTransform: "uppercase" }}>
        No data found!
      </span>
      Submit Some Passbook data.
    </div>
  );
}
