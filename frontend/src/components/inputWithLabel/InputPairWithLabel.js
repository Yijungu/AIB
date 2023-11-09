import React from "react";

const InputPairWithLabel = ({ label, options, removeInputPair }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
      <input list={label} style={{ width: "60px", height: "15px" }} />
      <datalist id={label}>
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
      <input style={{ marginLeft: "5px", width: "227px", height: "15px" }} />
      {removeInputPair && (
        <button style={{ marginLeft: "5px" }} onClick={removeInputPair}>
          -
        </button>
      )}
    </div>
  );
};

export default InputPairWithLabel;
