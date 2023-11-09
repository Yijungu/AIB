import React, { useState } from "react";
import InputPairWithLabel from "./InputPairWithLabel";

const DynamicInputPairManager = () => {
  const [inputPairs, setInputPairs] = useState([{ id: new Date().getTime() }]);

  const addInputPair = () => {
    const id = new Date().getTime();
    setInputPairs([...inputPairs, { id }]);
  };

  const removeInputPair = (id) => {
    setInputPairs(inputPairs.filter((pair) => pair.id !== id));
  };

  return (
    <div>
      <p>넣고 싶은 문구를 입력하세요.</p>
      {inputPairs.map((inputPair, index) => (
        <InputPairWithLabel
          key={inputPair.id}
          label={`항목 ${index + 1}`}
          options={["큰 홍보문구", "작은 홍보문구", "상세내용", "장소 & 일시"]}
          removeInputPair={
            index !== 0 ? () => removeInputPair(inputPair.id) : undefined
          }
        />
      ))}
      <button
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          width: "15px",
          height: "15px",
          marginTop: "5px",
          border: "0.1px solid black",
          borderRadius: "20%",
        }}
        onClick={addInputPair}
      >
        +
      </button>
    </div>
  );
};

export default DynamicInputPairManager;
