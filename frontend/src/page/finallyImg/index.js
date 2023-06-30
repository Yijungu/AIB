import React, { useState, useEffect } from "react";
import "./index.css";
import { TopMenu } from "../../components/menu/topMenu/topMenu";
import { Sidebar } from "../../components/menu/sideMenu/sideBar";
import { ImgWithEditableText } from "../../components/imgWithEditableText/imgWithEditableText";

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
    setIsSidebarOpen(true);
  };

  const handleTextChange = (index, newText) => {
    const updatedTexts = [...image.initialTexts];
    updatedTexts[index].text = newText;

    setImageSize({ ...imageSize, initialTexts: updatedTexts });
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setImageSize({
        width: "calc(100% - 200px)",
        height: "calc(100% - 16px)",
      });
    } else {
      setImageSize({ width: "100%", height: "100%" });
    }
  }, [isSidebarOpen]);

  return (
    <>
      <TopMenu imageUrl={"./testImgJpeg.jpeg"} />
      <div id="last-page">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
          {image.initialTexts.map((text, index) => (
            <div key={index}>
              <input
                type="text"
                value={text.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
              />
            </div>
          ))}
        </Sidebar>
        <div
          className={`image-container ${isSidebarOpen ? "shift-right" : ""}`}
          style={{
            transform: isSidebarOpen ? "translateX(200px)" : "none",
            transition: "transform 0.3s ease-in-out",
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
