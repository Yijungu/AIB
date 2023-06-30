import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./topMenu.css";
import { MyContext } from "../../../App";
import imageUrl from "../../../page/finallyImg/index";

export const TopMenu = () => {
  const { imageUrl } = useContext(MyContext);
  const handleDownloadImage = () => {
    const imageSrc = imageUrl // 이미지 파일 경로

    // 가상의 다운로드 링크 생성
    const downloadLink = document.createElement("a");
    downloadLink.href = imageSrc;
    downloadLink.download = "image.jpg"; // 다운로드될 파일명 설정

    // 클릭 이벤트를 발생시켜 파일 다운로드 진행
    downloadLink.click();
  };

  return (
    <nav>
      <ul>
        <li id="text-box">
          <Link id="aib-logo" to="/">
            AIB
          </Link>
        </li>
        <li>
          <button className="download-btn" onClick={handleDownloadImage}>
            Download Image
          </button>
        </li>
      </ul>
    </nav>
  );
};
