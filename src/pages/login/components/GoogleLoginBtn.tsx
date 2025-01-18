// import { GoogleLogin } from "@react-oauth/google";
import supabase from '../../../supabase';

const GoogleLoginBtn = () => {
  // NOTE: response 타입 찾아야함
  const handleGoogleLogin = async (response: any) => {
    try {
      console.log('Google OAuth Response:', response);

      // Google OAuth 토큰을 사용하여 Supabase 로그인
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // redirectTo: 'http://localhost:5173',
          scopes: 'openid email profile',
          // token: response.credential, // Google OAuth 토큰 전달
        },
      });

      if (authError) {
        console.error('Supabase OAuth Error:', authError.message);
        return;
      }

      // console.log('Google 로그인 데이터:', authData);
    } catch (error: any) {
      console.error('오류 발생:', error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-md border-gray-300 hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
    >
      <img
        src="/images/google-logo.png"
        alt="Google Icon"
        className="w-6 h-6"
      />
      Google 계정으로 로그인
    </button>
  );
};

export default GoogleLoginBtn;
