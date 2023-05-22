import React, { useState, useRef, useEffect } from "react";
import "./imgWithEditableText.css";

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
  textPositions,
}) => {
  const containerRef = useRef(null);
  const systemRef = useRef(null);
  const [texts, setTexts] = useState(initialTexts);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editing, setEditing] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);

  const handleTextClick = (index) => {
    setEditingIndex(index);
    setEditing(true);
  };

  const handleTextChange = (e, index) => {
    const newText = e.target.value;
    setTexts((prevTexts) =>
      prevTexts.map((text, i) => (i === index ? newText : text))
    );
  };

  const handleFontChange = (e) => {
    const newFontFamily = e.target.value;
    setTexts((prevTexts) =>
      prevTexts.map((text, index) =>
        index === editingIndex ? { ...text, fontFamily: newFontFamily } : text
      )
    );
  };

  const handleFontSizeChange = (e) => {
    const newFontSize = Number(e.target.value);
    setTexts((prevTexts) =>
      prevTexts.map((text, index) =>
        index === editingIndex ? { ...text, fontSize: newFontSize } : text
      )
    );
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const textStyles = textPositions.map((position, index) => ({
    top: `${position.y}px`,
    left: `${position.x}px`,
    fontSize: texts[index]?.fontSize ? `${texts[index].fontSize}px` : undefined,
    fontFamily: texts[index]?.fontFamily ? texts[index].fontFamily : undefined,
  }));

  const systemStyle = textPositions.map((position) => ({
    top: `${position.y - 60}px`,
    left: `${position.x}px`,
  }));

  return (
    <div className="image-with-text" ref={containerRef}>
      <img src={imageUrl} alt="AIB Service and Project Completion" />
      {texts.map((text, index) => (
        <div
          className="text-wrapper"
          style={textStyles[index]}
          onClick={() => handleTextClick(index)}
          key={index}
        >
          {text.text}
        </div>
      ))}
      {editing && (
        <div className="system" style={systemStyle} ref={systemRef}>
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
  );
};
