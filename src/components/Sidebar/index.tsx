import React from "react";
import "./index.css";

type SidebarProps = {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarExpanded,
  toggleSidebar,
}) => {
  return (
    <aside
      className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}
    >
      <div className="logo-container">
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarExpanded ? "⬅️" : "➡️"}
        </button>
        {isSidebarExpanded && <span className="logo-text">VehiclePro</span>}
      </div>
      <nav className="main-nav">
        <ul>
          <li className="nav-item active">
            <a href="#">
              <i className="nav-icon">🚗</i>
              {isSidebarExpanded && "Veículos"}
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <i className="nav-icon">👤</i>
              {isSidebarExpanded && "Usuários"}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
