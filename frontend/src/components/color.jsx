import { React, useState } from "react";
import { SketchPicker } from "react-color";

export const Color = (props) => {
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "255",
    g: "0",
    b: "0",
    a: "1",
  });
  const { r, g, b, a } = sketchPickerColor;

  const onChangeColor = (color) => {
    setSketchPickerColor(color.rgb);
  };

  return (
    <div id="style.color">
      <div
        style={{
          backgroundColor: `rgba(${r},${g},${b},${a})`,
          width: 50,
          height: 20,
          border: "2px solid white",
        }}
      ></div>
      <SketchPicker onChange={onChangeColor} color={sketchPickerColor} />
    </div>
  );
};
