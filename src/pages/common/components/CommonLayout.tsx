import { Outlet } from 'react-router-dom';
import { RootErrorBoundary } from './RootErrorBoundary';
import RootSuspense from './RootSuspense';
import Header from './Header';
const CommonLayout = () => {
  return (
    <RootErrorBoundary>
      <RootSuspense>
        {/* 공통 Header */}
        <Header />
        {/* 공통 레이아웃 Wrapper */}
        <main className="w-[600px] h-screen m-0">
          <Outlet />
        </main>
      </RootSuspense>
    </RootErrorBoundary>
  );
};

export default CommonLayout;
