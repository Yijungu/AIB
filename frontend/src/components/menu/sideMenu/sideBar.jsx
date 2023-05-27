import React from "react";
import "./sideBar.css";

const Sidebar = ({ isOpen, toggleSidebar, children }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Open"}
      </button>
      <div className="content">
        <h2>Sidebar Content</h2>
        <p>This is the content of the sidebar.</p>
      </div>
      <div className={`main-page ${isOpen ? "shift-right" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
