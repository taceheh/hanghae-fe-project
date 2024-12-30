import { createBrowserRouter } from 'react-router-dom';
import { pageRoutes } from './apiRoutes';
import CommonLayout from './pages/common/components/CommonLayout';
import ErrorPage from './pages/error/components/ErrorPage';
import RegisterPage from './pages/register/components';
// import MainPage from './pages';
import LoginPage from './pages/login';
import ProductPage from './pages/products';
import CartPage from './pages/carts/components';
import Mypage from './pages/mypage/components';
import ProductDetailPage from './pages/products/components/ProductDetail';

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      {
        path: pageRoutes.main,
        element: <ProductPage />,
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
        path: `${pageRoutes.product}/:id`, // 상세 페이지 경로 추가
        element: <ProductDetailPage />,
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
    ],
  },
]);

export default router;
