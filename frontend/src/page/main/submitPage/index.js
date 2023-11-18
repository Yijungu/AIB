import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { setData } from "../../../data/imgData";
import { TopMenu } from "../../../components/layouts/topMenu";
import InputWithLabel from "../../../components/inputWithLabel/InputWithLabel";
import InputWithImage from "../../../components/inputWithLabel/InputWithImage";
import DynamicInputPairManager from "../../../components/inputWithLabel/DynamicInputPairManager";
import { useNavigate } from "react-router-dom";

const SubmitPage = (props) => {
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [color, setColor] = useState("");
  const [logoImageFile, setLogoImageFile] = useState(null); // InputWithImage의 state
  const [imageFile, setImageFile] = useState(null); // InputWithImage의 state
  const [dynamicInputs, setDynamicInputs] = useState([]);

  const [image, setImage] = useState("");
  const [changedTexts, setChangedTexts] = useState([]);
  const [position, setPosition] = useState([]);
  const [fontSize, setFontSize] = useState([]);
  const [kerning, setKerning] = useState([]);
  const [alignments, setAlignments] = useState([]);
  const [textColor, setTextColor] = useState([]);
  const [background_color, setBackGroundColor] = useState([]);

  const navigator = useNavigate();

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const handleLogoImageChange = (file) => {
    setLogoImageFile(file);
  };

  const handleDynamicInputChange = (index, name, value) => {
    console.log("Index:", index, "Name:", name, "Value:", value);
    const newDynamicInputs = [...dynamicInputs];
    if (!newDynamicInputs[index]) {
      newDynamicInputs[index] = {};
    }

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
      logoImageFile,
      imageFile,
      dynamicInputs: JSON.stringify(dynamicInputs),
    };

    console.log(description);
    console.log(width);
    console.log(height);
    console.log(color);
    console.log(logoImageFile);
    console.log(imageFile);
    console.log(dynamicInputs);

    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    // endpoint 설정
    const endpoint = imageFile ? "request_picture_view" : "request_view";

    try {
      const response = await axios.post(
        `http://localhost:8000/api/${endpoint}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      setData(data);
      setChangedTexts(data.changed_texts);
      setPosition(data.position);
      setFontSize(data.font_size);
      setKerning(data.kerning);
      setAlignments(data.alignments);
      setTextColor(data.text_color);
      if (endpoint === "request_picture_view") {
        setBackGroundColor(data.background_color);
      } else {
        setImage(data.image);
      }
      navigator("/select");
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
          label="로고 사진이 있으시다면 넣어주세요."
          size={{ width: 300, height: 150 }}
          onImageChange={handleLogoImageChange}
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
