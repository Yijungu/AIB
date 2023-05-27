import React, { useState, useContext } from "react";
import "./index.css";
import { TopMenu } from "../../components/menu/topMenu/topMenu";
import { MyContext } from "../../App";

const LastPage = () => {
  const { imageUrl } = useContext(MyContext);
  console.log(imageUrl)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <>
      <TopMenu imageUrl={imageUrl} /> {/* imageUrl을 TopMenu로 전달 */}
      <div id="last-page">
        <div
          className={`image-container ${isSidebarOpen ? "shift-right" : ""}`}
        >
          <img
            src={imageUrl}
            className="image"
            alt="Main Image"
            onClick={handleImageClick}
          />
        </div>
        {isSidebarOpen && (
          <div className="sidebar">
            <button className="close-btn" onClick={toggleSidebar}>
              Close Sidebar
            </button>
            <div className="content">
              <h2>Sidebar Content</h2>
              <p>This is the content of the sidebar.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LastPage;
