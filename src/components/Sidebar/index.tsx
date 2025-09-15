import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth-store";

type SidebarProps = {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarExpanded,
  toggleSidebar,
}) => {
  const { user } = useAuthStore();

  return (
    <aside
      className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}
    >
      <div className="logo-container">
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarExpanded ? "⬅" : "⮕"}
        </button>
        {isSidebarExpanded && <span className="logo-text">Sistema</span>}
      </div>
      <nav className="main-nav">
        <ul>
          <li className="nav-item active">
            <Link to="/vehicles">
              <i className="nav-icon">🚗</i>
              {isSidebarExpanded && "Veículos"}
            </Link>
          </li>
          {user?.isRoot && (
            <li className="nav-item">
              <Link to="/users">
                <i className="nav-icon">👤</i>
                {isSidebarExpanded && "Usuários"}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
