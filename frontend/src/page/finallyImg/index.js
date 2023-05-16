import React from "react";
import { ImgWithEditableText } from "../../components/imgWithEditableText/imgWithEditableText";

const LastPage = () => {
  const image = {
    imageUrl: "/testImgJpeg.jpeg",
    initialTexts: [
      { text: "AIB Good Service", fontSize: 24, fontFamily: "Arial" },
      { text: "AIB Project Finish!!!", fontSize: 18, fontFamily: "Arial" },
    ],
    textPositions: [
      { x: 500, y: 200 },
      { x: 1000, y: 300 },
    ],
  };

  return (
    <>
      <ImgWithEditableText
        imageUrl={image.imageUrl}
        initialTexts={image.initialTexts}
        textPositions={image.textPositions}
      />
    </>
  );
};

export default LastPage;
