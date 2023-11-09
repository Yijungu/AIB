import React, { useState, useEffect } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setFontData } from "../../config/fontReducer/fontReducer";

export const ImgWithText = ({
  imageUrl,
  initialTexts,
  initialTextPositions,
  onClickText,
}) => {
  const texts = initialTexts;
  const [textIndex, setTextIndex] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [textPositions, setTextPositions] = useState(initialTextPositions);

  const font = useSelector(state => state.font);
  const dispatch = useDispatch();
  
  
  const handleTextClick = (index) => {
    dispatch(setFontData(texts[index]?.fontFamily, texts[index]?.fontSize));
    onClickText(texts[index]?.text);
  };
  const textStyles = textPositions.map((position, index) => ({
    top: `${position.y + 50}px`,
    left: `${position.x + 80}px`,
    fontSize: texts[index]?.fontSize,
    fontFamily: texts[index]?.fontFamily,
  }));

  const handleMouseDown = (e, index) => {
    setDragging(true);
    setTextIndex(index);
    setStartPos({
      x: e.clientX - textPositions[index].x,
      y: e.clientY - textPositions[index].y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging || textIndex === null) return;
    const newPosition = {
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    };
    setTextPositions((prevPositions) =>
      prevPositions.map((pos, index) =>
        index === textIndex ? newPosition : pos
      )
    );
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, startPos]);

  return (
    <form>
      <div
        style={{
          position: "relative",
        }}
        className="image-with-text"
        
      >
        <div>
          <img
            className="selectImg"
            src={imageUrl}
            alt="AIB Service and Project Completion"
          />
          {texts.map((text, index) => (
            <div
              className="text-wrapper"
              style={textStyles[index]}
              onClick={() => handleTextClick(index)}
              onMouseDown={(e) => handleMouseDown(e, index)}
              key={index}
            >
              {text.text}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
