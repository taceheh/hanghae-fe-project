import useAuthStore from '@/stores/auth/useAuthStore';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../login/LoginPage';

const Mypage = () => {
  const { user, isLogin, logout } = useAuthStore();
  const navigate = useNavigate();
  const navigateEditPage = () => navigate('/mypage/profile');
  const navigateHistoryPage = () => navigate('/myHistory');
  const navigateToSubPage = () => navigate('/subscription/history');

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_PROJECT_URL!,
    import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY!
  );

  const deleteUser = async (userId: string) => {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      console.error('User delete failed:', error);
    } else {
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/');
      console.log('User deleted successfully');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!userId) return alert('사용자 정보가 없습니다.');

    const confirmDelete = window.confirm('정말로 회원 탈퇴하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const { error: dbError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (dbError) {
        throw new Error(`users 테이블 삭제 실패: ${dbError.message}`);
      } else {
        deleteUser(userId);
      }
    } catch (error: any) {
      alert(`회원 탈퇴 실패: ${error.message}`);
    }
  };

  if (!isLogin) {
    return <LoginPage />;
  }

  return (
    <div className="relative bg-white min-h-[calc(100vh-60px)]">
      <div className=" pt-16 px-8 pb-8">
        <div className="text-2xl font-bold">{user?.name}님</div>
        <div className="text-sm">구독중인 플랜이 없어요!</div>
      </div>
      <div className="border-t border-gray-300"></div>
      <div className="p-8">
        <div className="pb-8 cursor-pointer" onClick={navigateHistoryPage}>
          주문내역
        </div>
        <div className="cursor-pointer" onClick={navigateToSubPage}>
          구독 정보 관리
        </div>
      </div>

      <div className="border-t border-gray-300"></div>
      <div className="p-8">
        <div className="pb-8" onClick={logout}>
          로그아웃
        </div>
        <div className="pb-8 cursor-pointer" onClick={navigateEditPage}>
          회원정보 수정
        </div>

        <div
          onClick={() => {
            handleDeleteUser(user?.id!);
          }}
        >
          회원 탈퇴하기
        </div>
      </div>
    </div>
  );
};

export default Mypage;
