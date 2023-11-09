import React, { useEffect, useState } from "react";
import "./index.css";
import { Layout } from "../../components/layouts";
import { fetchData, getData } from "../../data/imgData";
import { ImageAndText } from "../../components/ImageAndText";
import { NonImageAndText } from "../../components/nonImageAndText";

const LastPage = () => {
  // useEffect(() => { // data 비동기 로드
  //   fetchData();
  // }, []);

  // const imgData = getData();
  const realTestImage = {
    imageBase64: "./realTestImg.jpeg",
    texts: ["무더운 여름", "떠나자 해변으로"],
    positions: [{ x: 510, y: 200 }, { x: 510, y: 300 }],
    fontSize: [30, 55],
    kerning: [0.1, 0.2],
    alignment: "left",
    textColor: "#000000"
  }
  const realTestNBImage = {
    background_color: "#F9A9DE",
    texts: ["무더운 여름", "떠나자 해변으로"],
    positions: [{ x: 510, y: 200 }, { x: 510, y: 300 }],
    fontSize: [30, 55],
    kerning: [0.1, 0.2],
    alignment: "left",
    textColor: "#ffffff",
    product: "./buzz.png"
  }

  const [selectedText, setSelectedText] = useState("");
  const [displayTab, setDisplayTab] = useState(false);
  const imgCheck = realTestImage.imageBase64 ? true : false;

  const handleSelectedText = (newText) => {
    setSelectedText(newText);
  };
  const handleDisplayTabShow = () => {
    setDisplayTab(true);
  }

  return (
    <>
      <Layout
        selectedText={selectedText}
        displayTab={displayTab}
        imgCheck={imgCheck}
      >
        <div
          className="image-container"
        >{!imgCheck ?
          <ImageAndText
            realTestImage={realTestImage}
            handleSelectedText={handleSelectedText}
            handleDisplayTabShow={handleDisplayTabShow}
          /> :
          <NonImageAndText
            realTestNBImage={realTestNBImage}
            handleSelectedText={handleSelectedText}
            handleDisplayTabShow={handleDisplayTabShow}
          />
          }
        </div>
      </Layout>
    </>
  );
};

export default LastPage;
