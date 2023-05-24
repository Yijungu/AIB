import React, { useContext } from "react";
import { ImgWithEditableText } from "../../components/imgWithEditableText/imgWithEditableText";
import { MyContext } from "../../App"; // 경로는 알맞게 수정해주세요

const LastPage = () => {
  const { imageUrl } = useContext(MyContext);
  console.log(imageUrl)
  const image = {
    imageUrl_front: imageUrl,
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
        imageUrl={image.imageUrl_front}
        initialTexts={image.initialTexts}
        textPositions={image.textPositions}
      />
    </>
  );
};

export default LastPage;