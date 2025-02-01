import { createBrowserRouter } from 'react-router-dom';
import { pageRoutes } from './apiRoutes';
import CommonLayout from './pages/common/components/CommonLayout';
import ErrorPage from './pages/error/components/ErrorPage';
import { lazy } from 'react';

const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const ProductPage = lazy(() => import('./pages/products/ProductPage'));
const Mypage = lazy(() => import('./pages/mypage/Mypage'));
const CartPage = lazy(() => import('./pages/carts/CartPage'));
const OrderPage = lazy(() => import('./pages/order/OrderPage'));
const OrderReceiptPage = lazy(() => import('./pages/order/OrderReceiptPage'));
const ProfileEditPage = lazy(() => import('./pages/mypage/ProfileEditPage'));
const OrderHistoryPage = lazy(() => import('./pages/order/OrderHistoryPage'));
const ProductDetailPage = lazy(
  () => import('./pages/products/ProductDetailPage')
);
const SuccessPage = lazy(() => import('./pages/order/SuccessPage'));

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
        path: pageRoutes.profile,
        element: <ProfileEditPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.order,
        element: <OrderPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.orderReceipt,
        element: <OrderReceiptPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.myHistory,
        element: <OrderHistoryPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.success,
        element: <SuccessPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
