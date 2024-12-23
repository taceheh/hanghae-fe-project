import { pageRoutes } from "./apiRoutes";
import MainPage from "./pages";
import ErrorPage from "./pages/error/components/ErrorPage";
import {createBrowserRouter, Outlet} from "react-router-dom";
import LoginPage from "./pages/login/components";
import RegisterPage from "./pages/register/components";
import RootSuspense from "./pages/common/components/RootSuspense";
import {RootErrorBoundary} from "./pages/common/components/RootErrorBoundary";
import GoogleSignIn from "./pages/test";
import AuthCallbackHandler from "./utils/AuthCallbackHandler";

const CommonLayout = () => (
    <RootErrorBoundary>
      <RootSuspense>
        <Outlet />
      </RootSuspense>
    </RootErrorBoundary>
  );

const router= createBrowserRouter([
    {
        element:<CommonLayout/>,
        children:[
            {
                path: pageRoutes.main,
                element:<MainPage/>,
                errorElement: <ErrorPage/>,
            }, {
                path: pageRoutes.register,
                element:<RegisterPage/>,
                errorElement: <ErrorPage/>,
            }, {
                path: pageRoutes.login,
                element:<LoginPage/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: pageRoutes.callback,
                element: <AuthCallbackHandler />, // 필요한 컴포넌트 추가
                errorElement: <ErrorPage />,
              }
              
        ],
    },
]);

export default router;