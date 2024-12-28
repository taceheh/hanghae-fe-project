// import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from 'react';
import supabase from '../../../supabase';

const GoogleLoginBtn = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();
      if (!user) {
        console.error('인증된 사용자를 찾을 수 없습니다.');
        return;
      }
      console.log(user);
    };
    fetchUser();
  }, []);

  // NOTE: response 타입 찾아야함
  const handleGoogleLogin = async (response: any) => {
    try {
      console.log('Google OAuth Response:', response);

      // Google OAuth 토큰을 사용하여 Supabase 로그인
      const { data: authData, error: authError } =
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: 'http://localhost:5173',
            scopes: 'openid email profile',
            // token: response.credential, // Google OAuth 토큰 전달
          },
        });

      if (authError) {
        console.error('Supabase OAuth Error:', authError.message);
        return;
      }

      console.log('Google 로그인 데이터:', authData);

      // if (userError) {
      //   console.error(
      //     '사용자를 데이터베이스에 저장하는 중 오류 발생:',
      //     userError.message
      //   );
      // } else {
      //   console.log('사용자가 데이터베이스에 저장되었습니다:', userData);
      // }
    } catch (error: any) {
      console.error('오류 발생:', error.message);
    }
  };

  return (
    // <GoogleLogin
    //     onSuccess={handleGoogleLogin}
    //     onError={(error) => console.error("Google 로그인 오류:", error)}
    // />
    <button onClick={handleGoogleLogin}>버튼</button>
  );
};

export default GoogleLoginBtn;
