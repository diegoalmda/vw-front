import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth-store";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user || !user.isRoot) {
    return <Navigate to="/vehicles" />;
  }

  return children;
};

export default AdminRoute;
