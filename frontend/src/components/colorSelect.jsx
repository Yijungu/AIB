import React, { useState } from "react";
import { ChromePicker } from "react-color";

export const ColorSelect = ({ value, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(value);

  const handleColorClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleColorClose = () => {
    setDisplayColorPicker(false);
    onChange(currentColor);
  };

  return (
    <div id="color-select-">
      <div
        style={{
          backgroundColor: currentColor,
          width: "100%",
          height: "14px",
          borderRadius: "2px",
          display: "inline-block",
          cursor: "pointer",
        }}
        onClick={handleColorClick}
      />
      {displayColorPicker && (
        <div style={{ position: "absolute", zIndex: "2" }}>
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleColorClose}
          />
          <ChromePicker color={currentColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};
