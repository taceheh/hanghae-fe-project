import GoogleLoginBtn from '@/pages/login/components/GoogleLoginBtn';
import useAuthStore from '@/stores/auth/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const { user, isLogin, logout } = useAuthStore();
  const navigate = useNavigate();
  const navigateEditPage = () => navigate('/mypage/profile');
  const navigateHistoryPage = () => navigate('/myHistory');
  if (!isLogin) {
    // 로그인되지 않은 경우
    return (
      // bg-coffee-background bg-cover
      <div
        className="relative
        bg-center mt-48 flex flex-col items-center justify-center gap-6"
      >
        <div className="text-customBlack text-4xl font-bold ">로그인</div>

        <p className="text-customBlack text-center text-lg max-w-md">
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
      <div className=" pt-16 px-8 pb-8">
        <div className="text-2xl font-bold">{user?.name}님</div>
        <div className="text-sm">구독중인 플랜이 없어요!</div>
      </div>
      <div className="border-t border-gray-300"></div>
      <div className="p-8">
        <div className="pb-8 cursor-pointer" onClick={navigateHistoryPage}>
          주문내역
        </div>
        <div>구독 정보 관리</div>
      </div>

      <div className="border-t border-gray-300"></div>
      <div className="p-8">
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
