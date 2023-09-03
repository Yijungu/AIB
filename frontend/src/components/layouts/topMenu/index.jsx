import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export const TopMenu = () => {
  const [isLogin, setIsLogin] = useState(false);
  let loginText = "로그인";
  useEffect(() => {
    if (!isLogin) {
      loginText = "로그인";
    } else {
      loginText = "로그아웃";
    }
  })

  return (
    <nav>
      <ul id="logo">
        <li id="text-box">
          <Link id="aib-logo" to="/">
            AIB
            <span style={{ fontSize: "16px", fontWeight: "normal" }}>
              anner
            </span>
          </Link>
        </li>
      </ul>
      <ul id="service">
        <li>
          <Link className="service-button" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="service-button" to="/">
            기업 소개
          </Link>
        </li>
        <li>
          <Link className="service-button" to="/">
            가격
          </Link>
        </li>
        <li>
          <Link className="service-button" to="/">
            FAQ
          </Link>
        </li>
      </ul>
      <ul id="login">
        <li>
          <Link id="login-button" to="/">
            {loginText}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
