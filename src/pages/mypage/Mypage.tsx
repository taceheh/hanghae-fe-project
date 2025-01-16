import GoogleLoginBtn from '@/pages/login/components/GoogleLoginBtn';
import useAuthStore from '@/stores/auth/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const { isLogin, logout } = useAuthStore();
  const navigate = useNavigate();
  const navigateEditPage = () => navigate('/mypage/profile');
  if (!isLogin) {
    // 로그인되지 않은 경우
    return (
      <div className="relative bg-coffee-background bg-cover bg-center min-h-[calc(100vh-60px)] flex flex-col items-center justify-center gap-6">
        {/* 헤더 텍스트 */}
        <div className="text-gray-200 text-4xl font-bold drop-shadow-md">
          로그인
        </div>

        {/* 로그인 설명 */}
        <p className="text-gray-300 text-center text-lg max-w-md">
          간단한 로그인을 통해 테이스트빈을 이용해보세요.
        </p>

        {/* 구글 로그인 버튼 */}
        <GoogleLoginBtn />
      </div>
    );
  }

  // 로그인된 경우 (예시: 마이페이지 콘텐츠)
  return (
    <div className="relative bg-white min-h-[calc(100vh-60px)]">
      {/* <h1 className="text-4xl font-bold">Welcome to your MyPage!</h1> */}
      <div className=" pt-16 px-16 pb-8">
        <div className="text-2xl font-bold">홍길동님</div>
        <div className="text-sm">0 month plan 구독중</div>
      </div>
      <div className="border-t border-gray-300"></div>
      <div className="py-8 px-16">
        <div className="pb-8">주문내역</div>
        <div>구독 정보 관리</div>
      </div>

      <div className="border-t border-gray-300"></div>
      <div className="py-8 px-16">
        <div className="pb-8" onClick={logout}>
          로그아웃
        </div>
        <div className="pb-8 cursor-pointer" onClick={navigateEditPage}>
          회원정보 수정
        </div>

        <div>회원 탈퇴하기</div>
      </div>
    </div>
  );
};

export default Mypage;
