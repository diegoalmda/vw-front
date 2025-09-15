import "./index.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/auth-store";
import { useLogout } from "../hooks/auth/use-logout";

const DashboardLayout: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const { user, clearAuth } = useAuthStore();

  const { mutate: logout } = useLogout({
    onSuccess: () => {
      clearAuth();
      window.location.href = "/login";
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message ?? "Houve um erro ao tentar sair"
      );
    },
  });

  const handleLogout = async () => {
    await logout();
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div
      className={`app-container ${
        !isSidebarExpanded ? "sidebar-collapsed" : ""
      } ${isSidebarExpanded ? "expanded-mobile-layout" : ""}`}
    >
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <div className="main-content">
        <header className="main-header">
          <div>
            <div className="user-name">
              <strong>{user?.name || "Usuário"}</strong>
            </div>
            <div className="user-info">
              <span>Logado como:</span>
              <strong>{user?.isRoot ? "Admin" : "Comum"}</strong>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
