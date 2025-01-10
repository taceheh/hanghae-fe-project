import { createBrowserRouter } from 'react-router-dom';
import { pageRoutes } from './apiRoutes';
import CommonLayout from './pages/common/components/CommonLayout';
import ErrorPage from './pages/error/components/ErrorPage';
import LoginPage from './pages/login/LoginPage';
import ProductPage from './pages/products/ProductPage';
import Mypage from './pages/mypage/Mypage';
import ProductDetailPage from './pages/products/components/ProductDetail';
import CartPage from './pages/carts/CartPage';
import ProfileEditPage from './pages/mypage/components/ProfileEdit';
import OrderPage from './pages/order/components/OrderPage';

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
      {
        path: pageRoutes.order,
        element: <OrderPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
