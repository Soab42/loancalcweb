// import { Select } from "@mui/material";
// import { getDatabase, push, ref, remove, set, update } from "firebase/database";
// import React from "react";
// import { useRef } from "react";
// import { useEffect } from "react";
// import { app } from "../Firebase";

// export default function Database() {
//   const nameref = useRef(null);
//   const rollref = useRef(null);
//   const groupref = useRef(null);
//   const submithandle = (e) => {
//     e.preventDefault();
//     const name = nameref.current.value;
//     const roll = rollref.current.value;
//     const group = groupref.current.value;
//     const data = { name: name, roll: roll, group: group };
//     const db = getDatabase(app);
//     const dbref = ref(db, "kjphschool/" + group + "/" + roll);
//     set(dbref, data);
//   };

//   return (
//     <div style={{ marginTop: "10vh" }}>
//       <form
//         style={{
//           display: "grid",
//           justifyContent: "center",
//           gap: "1rem",
//           width: "100%",
//         }}
//         onSubmit={submithandle}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "1rem",
//             width: "100%",
//           }}
//         >
//           <label>name</label>
//           <input type={"text"} className="input" ref={nameref} />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "1rem",
//             width: "100%",
//           }}
//         >
//           <label>group</label>
//           <select classname="input" ref={groupref}>
//             <option>secience</option>
//             <option>arts</option>
//             <option>Commarce</option>
//           </select>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "1rem",
//             width: "100%",
//           }}
//         >
//           <label>Roll</label>
//           <input type={"number"} className="input" ref={rollref} />
//         </div>

//         <button className="btn" type="submit">
//           Admission
//         </button>
//       </form>
//     </div>
//   );
// }
