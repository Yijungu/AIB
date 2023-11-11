import React, { useState } from "react";
import "./InputWithLabel.css";

const InputWithLabel = ({
  label,
  placeholder,
  options,
  size,
  value,
  onChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const width = size?.width || "auto";
  const height = size?.height || "auto";

  return (
    <div>
      <p>{label}</p>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ width: `${width}px`, height: `${height}px` }}
        onFocus={() => setShowOptions(!!options)}
        onBlur={() => setShowOptions(false)}
      />
      {showOptions && (
        <div className="custom-dropdown">
          {options.map((option, index) => (
            <div key={index} className="custom-option">
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputWithLabel;
