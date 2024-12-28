import { createBrowserRouter } from 'react-router-dom';
import { pageRoutes } from './apiRoutes';
import MainPage from './pages';
import ErrorPage from './pages/error/components/ErrorPage';
import LoginPage from './pages/login';
import RegisterPage from './pages/register/components';
import ProductPage from './pages/products';
import CommonLayout from './pages/common/components/CommonLayout';
import CartPage from './pages/carts/components';
import Mypage from './pages/mypage/components';

// const CommonLayout = () => (
//     <RootErrorBoundary>
//       <RootSuspense>
//         <Header/>
//         <Outlet />
//       </RootSuspense>
//     </RootErrorBoundary>
//   );

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      {
        path: pageRoutes.main,
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.register,
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.login,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.product,
        element: <ProductPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.cart,
        element: <CartPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.mypage,
        element: <Mypage />,
        errorElement: <ErrorPage />,
      },

      // {
      //     path: pageRoutes.callback,
      //     element: <AuthCallbackHandler />, // 필요한 컴포넌트 추가
      //     errorElement: <ErrorPage />,
      //   }
    ],
  },
]);

export default router;
