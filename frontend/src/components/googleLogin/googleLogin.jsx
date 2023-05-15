import React from "react";
import GoogleLogin from "@leecheuk/react-google-login";
import { useNavigate } from "react-router-dom";

export const GoogleLoginButton = () => {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();
  const handleSuccess = (response) => {
    navigate("/submit");
    console.log("로그인 성공:", response);
  };

  const handleFailure = (error) => {
    console.log("로그인 실패:", error);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        clientId={CLIENT_ID}
      />
    </div>
  );
};
