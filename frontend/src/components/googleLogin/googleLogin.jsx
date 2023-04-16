import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleLoginButton = () => {
  const onSuccess = (response) => {
    console.log("로그인 성공", response);
    // 로그인 성공 시 처리할 로직 추가
  };

  const onFailure = (error) => {
    console.log("로그인 실패", error);
    // 로그인 실패 시 처리할 로직 추가
  };

  return (
    <GoogleOAuthProvider>
      <GoogleLogin
        clientId="1039952665351-8r47blls12qq2mpu0emfkoa0rmllt25a.apps.googleusercontent.com"
        buttonText="Google로 로그인"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </GoogleOAuthProvider>
  );
};
