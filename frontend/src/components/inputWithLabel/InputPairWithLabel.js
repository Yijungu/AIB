import React from "react";

const InputPairWithLabel = ({
  label,
  options,
  onInputChange,
  removeInputPair,
}) => {
  const handleOptionChange = (event) => {
    // 옵션 선택시, inputType은 선택된 옵션의 value입니다.
    onInputChange("type", event.target.value);
  };

  const handleValueChange = (event) => {
    // 입력 필드의 변경시, value는 입력된 텍스트입니다.
    onInputChange("value", event.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
      <select
        onChange={handleOptionChange}
        style={{ width: "60px", height: "15px" }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        style={{ marginLeft: "5px", width: "227px", height: "15px" }}
        onChange={handleValueChange}
      />
      {removeInputPair && (
        <button style={{ marginLeft: "5px" }} onClick={removeInputPair}>
          -
        </button>
      )}
    </div>
  );
};

export default InputPairWithLabel;
