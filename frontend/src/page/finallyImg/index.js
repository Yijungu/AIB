import React, { useState } from "react";
import "./index.css";

const LastPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageClick = () => {
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  return (
    <div id="last-page">
      <div
        className={`image-container ${isSidebarOpen ? "shift-right" : ""}`}
        onClick={handleImageClick}
      >
        <img src="./image.jpeg" className="image" alt="Main Image" />
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          Close Sidebar
        </button>
        <div className="content">
          <h2>Sidebar Content</h2>
          <p>This is the content of the sidebar.</p>
        </div>
      </div>
    </div>
  );
};

export default LastPage;
