import React, { useState } from "react";
import axios from "axios";
import "./index.css";

import { TopMenu } from "../../../components/layouts/topMenu";
import InputWithLabel from "../../../components/inputWithLabel/InputWithLabel";
import InputWithImage from "../../../components/inputWithLabel/InputWithImage";
import DynamicInputPairManager from "../../../components/inputWithLabel/DynamicInputPairManager";

const SubmitPage = (props) => {
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [color, setColor] = useState("");
  const [imageFile, setImageFile] = useState(null); // InputWithImage의 state
  const [dynamicInputs, setDynamicInputs] = useState([]);

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const handleDynamicInputChange = (index, name, value) => {
    const newDynamicInputs = [...dynamicInputs];
    newDynamicInputs[index][name] = value;
    setDynamicInputs(newDynamicInputs);
  };

  const handleSubmit = async () => {
    // 페이로드 생성
    const payload = {
      description,
      width,
      height,
      color,
      imageFile,
      dynamicInputs,
    };

    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    // endpoint 설정
    const endpoint = imageFile ? "request_picture_view" : "request_view";

    try {
      const response = await axios.post(
        `http://your-server-endpoint.com/api/${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 공통으로 사용되는 데이터
      const { changed_texts, position, font_size, kerning, alignments } =
        response.data;

      // 이 부분에 상태 업데이트 로직을 넣어주세요.

      if (endpoint === "request_picture_view") {
        const { background_color, text_color } = response.data;

        // 이 경우만 처리하는 상태 업데이트
        // ... (setState or dispatch 등을 사용)
      } else {
        const { image, text_color } = response.data;

        // 이 경우만 처리하는 상태 업데이트
        // ... (setState or dispatch 등을 사용)
      }
    } catch (error) {
      console.log("An error occurred while sending data", error);
    }
  };
  return (
    <div className="entire_box">
      <TopMenu />
      <div className="main_box">
        <InputWithLabel
          label="광고하고 싶은 것에 대한 설명을 적어주세요."
          placeholder="ex) 빠르게 맛있는 밥을 먹고 싶을 땐, 쿠쿠"
          size={{ width: 450, height: 80 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div
          style={{
            width: "200px",
          }}
        >
          <p>사이즈를 입력하세요.</p>
          <div
            style={{
              width: "200px",
              height: "60px",
            }}
          >
            <InputWithLabel
              label=""
              placeholder="가로"
              size={{ width: 80, height: 15 }}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
            <InputWithLabel
              label=""
              placeholder="세로"
              size={{ width: 80, height: 15 }}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>
        <InputWithLabel
          label="넣고 싶은 색이 있다면 입력해주세요."
          placeholder="#000000"
          size={{ width: 80, height: 15 }}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <InputWithImage
          label="상품 사진이 있으시다면 넣어주세요."
          size={{ width: 300, height: 150 }}
          onImageChange={handleImageChange}
        />
        <DynamicInputPairManager onInputChange={handleDynamicInputChange} />
        <button
          style={{ position: "relative", left: "430px", top: "50px" }}
          onClick={handleSubmit}
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default SubmitPage;
