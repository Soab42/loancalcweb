/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { app } from "../Firebase";

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth(app);

  return currentUser.uid === "4mh2oY46IqaHMvwNiW7FyqTKkuo2" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
