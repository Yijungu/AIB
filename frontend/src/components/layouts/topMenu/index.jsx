import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export const TopMenu = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  useEffect(() => {
    if (!isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [isLogin]);

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
          <Link className="service-button">
            기업 소개
          </Link>
        </li>
        <li>
          <Link className="service-button">
            가격
          </Link>
        </li>
        <li>
          <Link className="service-button">
            FAQ
          </Link>
        </li>
      </ul>
      <ul id="login">
        <li>
          <Link id="login-button">
            {isLogin ? "로그아웃" : "로그인"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
