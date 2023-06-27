import React, { useState, useContext } from "react";
import "./index.css";
import { TopMenu } from "../../components/menu/topMenu/topMenu";
import { ImgWithEditableText } from "../../components/imgWithEditableText/imgWithEditableText";
import { MyContext } from "../../App";

const LastPage = () => {
  const { imageUrl } = useContext(MyContext);
  const imgTest = "./testImgJpeg.jpeg";
  const image = {
    imageUrl_front: imgTest,
    initialTexts: [
      {
        text: "AIB는\n 아이브라고 읽어!!@#1234",
        fontSize: 24,
        fontFamily: "Arial",
      },
      { text: "AIB Project\n 末!!!", fontSize: 18, fontFamily: "Arial" },
      {
        text: "언제 이 프로젝트가\n끝날까...?",
        fontSize: 20,
        fontFamily: "Arial",
      },
    ],
    textPositions: [
      { x: 500, y: 200 },
      { x: 1000, y: 300 },
      { x: 1, y: 1 },
    ],
  };
  console.log(imageUrl);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <>
      <TopMenu imageUrl={"./testImgJpeg.jpeg"} />
      <div id="last-page">
        <div
          className={`image-container ${isSidebarOpen ? "shift-right" : ""}`}
        >
          <ImgWithEditableText
            imageUrl={image.imageUrl_front}
            initialTexts={image.initialTexts}
            initialTextPositions={image.textPositions}
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
