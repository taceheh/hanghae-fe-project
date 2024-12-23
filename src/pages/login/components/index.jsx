import React from 'react'

{/* <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
  />; */}
  import { useGoogleLogin } from '@react-oauth/google';
import { useLogin } from '../../../hooks/useLogin';


{/* <MyCustomButton onClick={() => login()}>Sign in with Google 🚀</MyCustomButton>; */}

const LoginPage = () => {
  // const {loginWithGoogle} = useSupabaseAuth();
  // const login = useGoogleLogin({
  //   onSuccess: codeResponse => console.log(codeResponse),
  //   flow: 'auth-code',
  // });
  const login = useLogin();
  
  return (
    <div>
      <button onClick={login}>로그인</button>
     
    </div>
  )
}

export default LoginPage
