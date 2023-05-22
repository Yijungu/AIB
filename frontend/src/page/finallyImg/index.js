import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImgWithEditableText } from "../../components/imgWithEditableText/imgWithEditableText";

const LastPage = () => {
  const [getImageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // 이미지를 받아올 API 엔드포인트 호출
    fetchImage()
      .then((response) => {
        // 응답 데이터에서 이미지 URL 추출
        const getImageUrl = response.data.getImageUrl;
        // 이미지 URL을 상태 변수에 저장
        setImageUrl(getImageUrl);
      })
      .catch((error) => {
        // 오류 처리
        console.error("Failed to fetch image:", error);
      });
  }, []);

  const fetchImage = async () => {
    try {
      const response = await axios.get("http://localhost/api/image");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch image", error);
    }
  };

  const image = {
    // imageUrl: getImageUrl,
    imageUrl: "./testImgJpeg.jpeg",
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
