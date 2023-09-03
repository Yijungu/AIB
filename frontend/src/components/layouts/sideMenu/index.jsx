import React from "react";
import "./index.css";

export const Sidebar = ({ isOpen, toggleSidebar, children }) => {
  const handleClose = () => {
    toggleSidebar();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="content">
        <h2>색상</h2>
        <p>1. 검정</p>
        <p>2. 빨강</p>
      </div>
    </div>
  );
};
