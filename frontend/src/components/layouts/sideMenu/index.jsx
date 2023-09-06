import React from "react";
import "./index.css";

export const Sidebar = ({ isOpen, toggleSidebar, children }) => {

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="content">
        <h2>색상</h2>
        <div>
          <div>
            <span>1. 검정</span>
          </div>
          <div>
            <span>2. 빨강</span>
          </div>
        </div>
      </div>
    </div>
  );
};
