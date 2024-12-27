import { Outlet } from "react-router-dom";
import Header from "../Header";
import { RootErrorBoundary } from "./RootErrorBoundary";
import RootSuspense from "./RootSuspense";


const CommonLayout = () => {
  return (
    <RootErrorBoundary>
      <RootSuspense>
        {/* 공통 Header */}
        <Header className="w-[600px] m-0" />
        {/* 공통 레이아웃 Wrapper */}
        <main className="w-[600px] h-screen m-0">
          <Outlet />
        </main>
      </RootSuspense>
    </RootErrorBoundary>
  );
};

export default CommonLayout;
