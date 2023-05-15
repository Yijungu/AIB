import React, { useState, useRef, useEffect } from "react";

const fontOptions = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Verdana", label: "Verdana" },
  // ...
];

export const ImageWithEditableText = ({
  imageUrl,
  initialText,
  textPosition,
}) => {
  const containerRef = useRef(null);
  const systemRef = useRef(null);
  const [text, setText] = useState(initialText);
  const [editing, setEditing] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);

  const handleTextClick = () => {
    setEditing(true);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
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

  const containerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
  };

  const textStyle = {
    position: "absolute",
    top: `${textPosition.y}px`,
    left: `${textPosition.x}px`,
    color: "white",
    fontSize: `${fontSize}px`,
    fontFamily: `${fontFamily}`,
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
    transition: "all 0.3s",
  };

  const systemStyle = {
    position: "absolute",
    top: `${textPosition.y - 50}px`, // 시스템의 세로 위치 조정
    left: `${textPosition.x}px`, // 시스템의 가로 위치 조정
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    color: "white",
    padding: "7px",
    background: "rgba(0, 0, 0, 0.8)",
    borderRadius: "4px",
  };

  return (
    <div className="image-with-text" style={containerStyle} ref={containerRef}>
      <img src={imageUrl} alt="Image" style={imageStyle} />
      <div className="text-wrapper" style={textStyle} onClick={handleTextClick}>
        {text}
      </div>
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
