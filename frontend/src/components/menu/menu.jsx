import { React } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

export const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/example">EXAMPLE</Link>
        </li>
        <li>
          <Link to="/submit">Submit</Link>
        </li>
      </ul>
    </nav>
  );
};
