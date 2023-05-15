import React, { useState } from "react";

export const ImageWithText = ({ imageUrl, initialText, textPosition }) => {
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
    fontSize: "24px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
  };

  const [text, setText] = useState(initialText);
  const [editing, setEditing] = useState(false);

  const handleTextClick = () => {
    setEditing(true);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTextBlur = () => {
    setEditing(false);
  };

  return (
    <div className="image-with-text" style={containerStyle}>
      <img src={imageUrl} alt="Image" style={imageStyle} />
      {editing ? (
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          style={textStyle}
          autoFocus
        />
      ) : (
        <div className="text" style={textStyle} onClick={handleTextClick}>
          {text}
        </div>
      )}
    </div>
  );
};
