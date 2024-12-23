import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase"; // supabase 객체 가져오기

const AuthCallbackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      // URL에서 auth code를 가져와 Supabase 세션으로 교환
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      console.log(data)
      console.log(error)

      if (error) {
        console.error("Error handling auth callback:", error.message);
        return;
      }

      console.log("Auth Data:", data); // 인증 성공 데이터
      navigate("/"); // 인증 성공 후 홈으로 리디렉션
    };

    handleAuth();
  }, [navigate]);

  return <div>Processing authentication...</div>;
};

export default AuthCallbackHandler;
