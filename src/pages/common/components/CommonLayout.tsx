import { Outlet } from 'react-router-dom';
import { RootErrorBoundary } from './RootErrorBoundary';
import RootSuspense from './RootSuspense';
import Header from './Header';
import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/auth/useAuthStore';
const CommonLayout = () => {
  const { checkSession } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

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
