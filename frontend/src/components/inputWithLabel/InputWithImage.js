import React, { useRef } from "react";
import ImageInput from "../../image/imageInput.png";

const InputWithImage = ({ label, size }) => {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    // 파일 처리 로직 (예: 파일을 서버에 업로드)
    console.log(files);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  return (
    <div>
      <p>{label}</p>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        style={{
          width: size.width,
          height: size.height,
          border: "1px solid black",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          display: "flex",
        }}
      >
        <img src={ImageInput} style={{ width: "50px", height: "50px" }}></img>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputWithImage;
