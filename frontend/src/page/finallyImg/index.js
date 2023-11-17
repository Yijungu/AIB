import React, { useState } from "react";
import "./index.css";
import { Layout } from "../../components/layouts";
import { ImageAndText } from "../../components/ImageAndText";
import { NonImageAndText } from "../../components/nonImageAndText";
import { DownloadButton } from "../../components/downloadButton";

import {
  image,
  changed_texts,
  position,
  font_size,
  kerning,
  alignments,
  text_color,
  select_image_index,
} from '../../data/testData';
import { getData } from "../../data/imgData";

const LastPage = () => {
  const ImageData = getData();
  console.log("LastPage ImageData:", ImageData);
  const realTestImage = {
    imageBase64: image[select_image_index],
    texts: changed_texts[select_image_index],
    positions: position[select_image_index],
    fontSize: font_size[select_image_index],
    kerning: kerning[select_image_index],
    alignment: alignments[select_image_index],
    textColor: text_color[select_image_index]
  }
  const realTestNBImage = {
    background_color: "#F9A9DE",
    texts: ["고퀄리티", "삼다수 버즈 케이스"],
    positions: [{ x: 510, y: 200 }, { x: 510, y: 300 }],
    fontSize: [30, 55],
    kerning: [0.1, 0.2],
    alignment: "left",
    textColor: "#ffffff",
    product: "./buzz.png"
  }

  const [selectedText, setSelectedText] = useState("");
  const [displayTab, setDisplayTab] = useState(false);
  // const imgCheck = realTestImage.imageBase64 ? true : false;
  const imgCheck = true;
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
        <div className="image-container">
          {imgCheck ?
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
        1
        <div className="download-button-container">
          <DownloadButton />
        </div>
      </Layout>
    </>
  );
};

export default LastPage;
