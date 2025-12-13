import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const logged = localStorage.getItem("adminLogged");

  if (logged !== "true") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
