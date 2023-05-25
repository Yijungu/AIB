import React, { useContext } from "react";
import { ImgWithEditableText } from "../../components/imgWithEditableText/imgWithEditableText";
import { MyContext } from "../../App"; // 경로는 알맞게 수정해주세요
import "./index.css";
import { Logo } from "../../components/logo/logo";

const LastPage = () => {
  const { imageUrl, texts, position, fontSize, kerning, alignments } =
    useContext(MyContext);
  console.log(imageUrl);
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
    ],
    textPositions: [
      { x: 500, y: 200 },
      { x: 1000, y: 300 },
    ],
  };

  return (
    <div id="imgEdit">
      <Logo />
      <ImgWithEditableText
        imageUrl={image.imageUrl_front}
        initialTexts={image.initialTexts}
        textPositions={image.textPositions}
      />
    </div>
  );
};

export default LastPage;
