import React from "react";
import "./index.css";

export const TextBox = (props) => {
  return (
    <div>
      <p>
        선택한 Text: <br />
      </p>
      <div id="selected-text">{props.selectedText}</div>
    </div>
  );
};
