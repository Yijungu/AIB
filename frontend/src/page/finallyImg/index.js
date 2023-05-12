import React from "react";
import { ImageWithText } from "../../components/imgWithText/imgWithText";

const LastPage = () => {
  const image = {
    imageUrl: "/testImgJpeg.jpeg",
    initialText: "AIB Good Service",
    textPosition: { x: 500, y: 200 },
  };
  return (
    <>
      <ImageWithText {...image} />
    </>
  );
};

export default LastPage;
