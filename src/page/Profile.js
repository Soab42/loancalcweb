import { Alert, AlertTitle, Button, Input, InputLabel } from "@mui/material";

import { getDatabase, onValue, query, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { app, auth } from "../Firebase";

export default function Profile() {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser.displayName);
  const [email, SetEmail] = useState(currentUser.email);
  const [password, SetPassword] = useState(currentUser.password);
  const [userinfo, setUserinfo] = useState({});
  const db = getDatabase(app);
  const [branchname, SetBranchname] = useState();
  const [code, SetCode] = useState();

  useEffect(() => {
    const dbref = ref(db, currentUser.uid + "/userinfo");
    const dbquery = query(dbref);
    onValue(dbquery, (snapshot) => {
      if (snapshot.exists()) {
        setUserinfo(snapshot.val());
      }
    });
  }, [currentUser, db]);

  const submitbranch = () => {
    const dbref = ref(db, currentUser.uid + "/userinfo");
    const userinfo = {
      name,
      email,
      branchname,
      code,
    };
    set(dbref, userinfo)
      .then(() => alert("updated"))
      .catch((err) => alert("Error!"));
  };
  return (
    <div
      style={{
        marginTop: "15vh",
        textAlign: "center",
      }}
    >
      <h1>Profile</h1>
      {auth.currentUser.photoURL ? (
        <img src={auth.currentUser.photoURL} alt="" className="dp" />
      ) : null}
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            display: "grid",
            width: "100%",
            padding: "2rem",
            gap: ".5rem",
            textTransform: "capitalize",
          }}
        >
          <div>personal info</div>
          <InputLabel>Name</InputLabel>
          <Input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputLabel>Email</InputLabel>

          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />
          <InputLabel>Password</InputLabel>
          <Input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />
          <Button>Coming soon......</Button>
        </div>
        <div
          style={{
            display: "grid",
            width: "100%",
            padding: "2rem",
            gap: "1rem",
            textTransform: "capitalize",
          }}
        >
          <InputLabel>Branch Info</InputLabel>

          <Alert severity="success" variant="filled">
            <AlertTitle>{userinfo.branchname}</AlertTitle>
          </Alert>
          <Input
            type="text"
            placeholder="Branch Name"
            value={branchname}
            onChange={(e) => SetBranchname(e.target.value)}
          />

          <Alert severity="success" variant="filled">
            <AlertTitle>{userinfo.code}</AlertTitle>
          </Alert>

          <Input
            type="text"
            value={code}
            placeholder="Branch Code"
            onChange={(e) => SetCode(e.target.value)}
          />
          {/* <Input type="text" placeholder="password" /> */}
          <Button onClick={submitbranch}>Update</Button>
        </div>
      </div>
    </div>
  );
}
