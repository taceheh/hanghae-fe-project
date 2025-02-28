import GoogleLoginBtn from './components/GoogleLoginBtn';

const LoginPage = () => {
  return (
    <div
      className="relative
    bg-center mt-48 flex flex-col items-center justify-center gap-6"
    >
      <div className="text-customBlack text-4xl font-bold ">로그인</div>

      <p className="text-customBlack text-center text-lg max-w-md">
        간단한 로그인을 통해 테이스트빈을 이용해보세요.
      </p>

      <GoogleLoginBtn />
    </div>
  );
};

export default LoginPage;
