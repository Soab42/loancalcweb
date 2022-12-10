/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate replace to="/login" />;
}
