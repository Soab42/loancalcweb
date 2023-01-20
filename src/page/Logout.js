import { getAuth, signOut } from "firebase/auth";

import { app } from "../Firebase";

export default function Logout() {
  const auth = getAuth(app);
  signOut(auth);
}
