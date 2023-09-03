import React, { useState, useEffect } from "react";
import "./index.css";
import { TopMenu } from "../../components/layouts/topMenu";
import { Sidebar } from "../../components/layouts/sideMenu";
import { ImgWithEditableText } from "../../components/imgWithEditableText";

const LastPage = () => {
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [imageSize, setImageSize] = useState({ width: "100%", height: "100%" });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageClick = () => {
    setIsSidebarOpen(isSidebarOpen ? false : true);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setImageSize({
        width: "calc(100% - 250px)",
        height: "100%",
      });
    } else {
      setImageSize({ width: "100%", height: "100%" });
    }
  }, [isSidebarOpen]);

  const contentClass = isSidebarOpen ? "content shrink" : "content";

  return (
    <>
      <TopMenu imageUrl={imgTest} />
      <div id="last-page">
        <Sidebar isOpen={isSidebarOpen}>
          <h2>Sidebar Content</h2>
          <p>This is the content of the sidebar.</p>
        </Sidebar>
        <div
          className={`image-container ${isSidebarOpen ? "shift-right" : ""}`}
          style={{
            transform: isSidebarOpen ? "translateX(300px)" : "none",
            width: imageSize.width,
          }}
        >
          <ImgWithEditableText
            imageUrl={image.imageUrl_front}
            initialTexts={image.initialTexts}
            initialTextPositions={image.textPositions}
            style={imageSize}
            onClick={handleImageClick}
          />
        </div>
      </div>
    </>
  );
};

export default LastPage;
