import React from "react";
import "./sideBar.css";

export const Sidebar = ({ isOpen, toggleSidebar, children }) => {
  const handleClose = () => {
    toggleSidebar();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={handleClose}>
        {isOpen ? "Close" : "Open"}
      </button>
      <div className="content">
        <h2>Sidebar Content</h2>
        <p>This is the content of the sidebar.</p>
      </div>
    </div>
  );
};
