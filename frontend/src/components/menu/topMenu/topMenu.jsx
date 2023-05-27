import { React } from "react";
import { Link } from "react-router-dom";
import "./topMenu.css";

export const TopMenu = () => {
  return (
    <nav>
      <ul>
        <li id="text-box">
          <Link id="aib-logo">AIB</Link>
        </li>
      </ul>
    </nav>
  );
};
