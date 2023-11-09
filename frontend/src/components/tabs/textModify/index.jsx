import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFontData } from "../../../config/fontReducer/fontReducer";
import { SelectColorBox } from "../../selectColorBox";

export const TextModify = () => {
  const font = useSelector(state => state.font.textElement);
  const tIndex = useSelector(state => state.tIndex.textIndex);
  const dispatch = useDispatch();

  const fontSizes = [...font.fontSizes];

  const handleFontSizeChange = (e) => {
    const newFontSize = Number(e.target.value);
    fontSizes[tIndex] = newFontSize;
    dispatch(setFontData(tIndex, newFontSize, font.fontColor));
  };

  return (
    <div>
      <div style={{ margin: "10px 0px" }}>
        <label>
          크기: &nbsp;
        </label>
        <input
          type="number"
          value={fontSizes[tIndex]}
          onChange={handleFontSizeChange}
          style={{ width: 50, height: 15 }}
        />
      </div>
      <div>
        색깔
        <SelectColorBox tIndex={tIndex}/>
      </div>
    </div>
  );
};
