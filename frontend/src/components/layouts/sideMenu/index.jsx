import React from "react";
import "./index.css";

export const Sidebar = ({ isOpen, toggleSidebar, children }) => {
  const handleClose = () => {
    toggleSidebar();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="content">
        <h2>Sidebar Content</h2>
        <p>This is the content of the sidebar.</p>
      </div>
    </div>
  );
};
