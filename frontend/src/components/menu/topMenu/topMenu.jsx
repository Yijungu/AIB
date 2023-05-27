import React from "react";
import { Link } from "react-router-dom";
import "./topMenu.css";
import imageUrl from "../../../page/finallyImg/index";

export const TopMenu = () => {
  const handleDownloadImage = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "image.jpg";
    downloadLink.click();
  };

  return (
    <nav>
      <ul>
        <li id="text-box">
          <Link id="aib-logo" to="/">
            AIB
          </Link>
        </li>
        <li>
          <button className="download-btn" onClick={handleDownloadImage}>
            Download Image
          </button>
        </li>
      </ul>
    </nav>
  );
};
