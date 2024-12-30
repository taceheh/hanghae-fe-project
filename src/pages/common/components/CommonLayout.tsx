import { Outlet } from 'react-router-dom';
import { RootErrorBoundary } from './RootErrorBoundary';
import RootSuspense from './RootSuspense';
import Header from './Header';
import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/auth/useAuthStore';
import supabase from '@/supabase';
const CommonLayout = () => {
  // const { checkSession, isLogin, user } = useAuthStore();

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     await checkSession(); // 세션 확인
  //     console.log('isLogin:', isLogin); // 상태 확인
  //     console.log('User:', user);
  //   };
  //   fetchSession();
  // }, [checkSession]);
  const { checkSession } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  // supabase 유저에 저장된 uuid가져오기
  // const fetchUser = async () => {
  //   const { data, error } = await supabase.auth.getUser();

  //   if (error) {
  //     console.error('Failed to fetch user info:', error.message);
  //     return null;
  //   }

  //   const userId = data.user.identities?.[0].user_id;
  //   // console.log('userId :', userId);
  //   return userId;
  // };

  // user DB 테이블에 UUID와 일치하는 사용자 정보 가져오기
  // const getUserInfo = async () => {
  //   const userId = await fetchUser();
  //   const { data, error } = await supabase
  //     .from('users') // Supabase 데이터베이스의 테이블 이름
  //     .select('id, name, email, phonenumber, address') // 필요한 칼럼만 선택
  //     .eq('id', userId) // ID로 필터링
  //     .single(); // 단일 결과만 가져옴

  //   console.log(userId);
  //   console.log(data);
  //   if (error) {
  //     console.error(
  //       'DB에서 사용자 정보를 가져오는 데 실패했습니다.',
  //       error.message
  //     );
  //     return null;
  //   }

  //   return data; // users 테이블에서 가져온 사용자 정보
  // };

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  useEffect(() => {
    const fetchSession = async () => {
      await checkSession(); // 상태 업데이트 완료 후
      setIsLoading(false); // 로딩 완료
      console.log('Zustand State after checkSession:', useAuthStore.getState());
    };
    fetchSession();
  }, [checkSession]);

  if (isLoading) {
    return <div>Loading...</div>; // 비동기 작업이 끝날 때까지 로딩 표시
  }
  return (
    <RootErrorBoundary>
      <RootSuspense>
        {/* 공통 Header */}
        <Header />
        {/* 공통 레이아웃 Wrapper */}
        <main className="w-[600px]  min-h-[calc(100vh-60px)] m-0">
          <Outlet />
        </main>
      </RootSuspense>
    </RootErrorBoundary>
  );
};

export default CommonLayout;
