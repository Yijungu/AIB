import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { TopMenu } from "../../components/layouts/topMenu";
import { TextOverlay } from "../../components/textOverlay";

import {
  image,
  changed_texts,
  position,
  font_size,
  kerning,
  alignments,
  text_color,
  select_image_index,
  setSelectImageIndex
} from '../../data/testData';

const SelectPage = () => {
  const [isCheck, setIsCheck] = useState([false, false, false]); // 사진 개수 3개로 고정
  const handleSelectImage = (index) => {
    console.log("sp:", isCheck);
    const newIsCheck = Array(3).fill(false);
    newIsCheck[index] = true;
    setIsCheck(newIsCheck);
  };

  const navigator = useNavigate();
  const handleClickButton = () => {
    const selectedIndex = isCheck.findIndex((checked) => checked);
    if (selectedIndex !== -1) {
      setSelectImageIndex(selectedIndex);
      navigator("/last");
    } else {
      // 에러 처리: 선택된 이미지가 없는 경우
      console.error("이미지를 선택하세요.");
    }
  }

  return (
    <div>
      <TopMenu />
      <div id="select-container">
        <div id="text-area">
          <h1>Web Banner</h1>
          <p>마음에 드는 웹 배너를 골라주세요.</p>
        </div>
        <div id="select-area">
          {image.map((v, i) => (
            <div key={i} style={{position: "relative"}}>
              <img
                className={isCheck[i] ? "selected-image" : "select-image"}
                src={v}
                onClick={() => handleSelectImage(i)}
                style={{
                  marginBottom: 50
                }}
              />
              <TextOverlay
                positions={position[i]}
                fontSizes={font_size[i]}
                letterSpacings={kerning[i]}
                colors={text_color[i]}
                alignments={alignments[i]}
                texts={changed_texts[i]}
              />
            </div>
          ))}
        </div>
      </div>
      <div id="button-area">
        <button id="select-button" onClick={handleClickButton}>선택 완료</button>
      </div>

    </div>
  );
};

export default SelectPage;
