import React, { useRef } from "react";
import ImageInput from "../../image/imageInput.png";

const InputWithImage = ({ label, size, onImageChange }) => {
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
    console.log(files); // 파일 로그 출력
    onImageChange(files[0]); // 첫 번째 파일을 상위 컴포넌트로 전달
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
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
