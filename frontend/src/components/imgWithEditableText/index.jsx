import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const fontOptions = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Verdana", label: "Verdana" },
  // ...
];

export const ImgWithEditableText = ({
  imageUrl,
  initialTexts,
  initialTextPositions,
  style,
}) => {
  const containerRef = useRef(null);
  const systemRef = useRef(null);
  const [texts, setTexts] = useState(initialTexts);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editing, setEditing] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [textPositions, setTextPositions] = useState(initialTextPositions);

  const handleTextClick = (index) => {
    setEditingIndex(index);
    setEditing(true);
  };

  const handleFontChange = (e) => {
    const newFontFamily = e.target.value;
    setTexts((prevTexts) =>
      prevTexts.map((text, index) => {
        if (index === editingIndex) {
          return { ...text, fontFamily: newFontFamily };
        }
        return text;
      })
    );
    setFontFamily(newFontFamily);
  };

  const handleFontSizeChange = (e) => {
    const newFontSize = Number(e.target.value);
    setTexts((prevTexts) =>
      prevTexts.map((text, index) => {
        if (index === editingIndex) {
          return { ...text, fontSize: newFontSize };
        }
        return text;
      })
    );
    setFontSize(newFontSize);
  };

  const handleClickOutside = (e) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target) &&
      systemRef.current &&
      !systemRef.current.contains(e.target)
    ) {
      setEditing(false);
    }
  };

  const textStyles = textPositions.map((position, index) => ({
    top: `${position.y}px`,
    left: `${position.x}px`,
    fontSize: texts[index]?.fontSize ? `${texts[index].fontSize}px` : "24px",
    fontFamily: texts[index]?.fontFamily ? texts[index].fontFamily : "Arial",
  }));

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseDown = (e, index) => {
    if (editing) return;
    setDragging(true);
    setEditingIndex(index);
    setStartPos({
      x: e.clientX - textPositions[index].x,
      y: e.clientY - textPositions[index].y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging || editingIndex === null) return;
    const newPosition = {
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    };
    setTextPositions((prevPositions) =>
      prevPositions.map((pos, index) =>
        index === editingIndex ? newPosition : pos
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
  }, [dragging, editingIndex, startPos]);

  return (
    <form>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          width: style.width,
          height: style.height,
        }}
        className="image-with-text"
        ref={containerRef}
      >
        <div>
          <img
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
        {editing && (
          <div
            className="system"
            style={{
              top: `${textPositions[editingIndex].y - 60}px`,
              left: `${textPositions[editingIndex].x}px`,
            }}
            ref={systemRef}
          >
            <div>
              <label>
                Font Family: &nbsp;
                <select value={fontFamily} onChange={handleFontChange}>
                  {fontOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                Font Size: &nbsp;
                <input
                  type="number"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
