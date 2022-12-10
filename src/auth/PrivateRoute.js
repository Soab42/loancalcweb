/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { app } from "../Firebase";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth(app);

  return !currentUser ? children : <Navigate to="/" />;
}
