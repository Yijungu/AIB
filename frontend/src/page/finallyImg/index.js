import React from "react";
import { ImageWithEditableText } from "../../components/imgWithEditableText/imgWithEditableText";

const LastPage = () => {
  const image = {
    imageUrl: "/testImgJpeg.jpeg",
    initialText: "AIB Good Service",
    textPosition: { x: 500, y: 200 },
  };
  return (
    <>
      <ImageWithEditableText {...image} />
    </>
  );
};

export default LastPage;
