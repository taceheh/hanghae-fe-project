import React, { useEffect } from 'react';
import supabase from '../supabase';


// Google 로그인 처리 함수
async function handleSignInWithGoogle(response) {
  try {
    // Supabase로 Google 인증 토큰 전송
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential, // Google에서 제공하는 인증 토큰
    });

    if (error) {
      console.error("Google 로그인 오류:", error.message);
      return;
    }

    // 로그인 성공
    console.log("Google 로그인 성공:", data);
    // 로그인 후 페이지 리다이렉션 등 추가 로직을 구현할 수 있습니다.
    window.location.href = "/home"; // 예시로 /home 페이지로 리다이렉션
  } catch (error) {
    console.error("Supabase 로그인 오류:", error);
  }
}

const GoogleSignIn = () => {
  useEffect(() => {
    // Google Client Library 로드 후 초기화
    window.google.accounts.id.initialize({
      client_id: '335947813436-p3n51btgegg57npn8thtuj18epha64j8.apps.googleusercontent.com',  // 구글 클라이언트 ID
      callback: handleSignInWithGoogle, // 로그인 후 호출될 콜백 함수
    });

    // 로그인 버튼 렌더링
    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "signin_with",
      }
    );
  }, []);

  return (
    <div>
      {/* 구글 로그인 버튼을 렌더링할 div */}
      <div id="google-signin-button"></div>
    </div>
  );
};

export default GoogleSignIn;