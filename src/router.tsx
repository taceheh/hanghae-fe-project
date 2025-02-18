import { createBrowserRouter } from 'react-router-dom';
import { pageRoutes } from './apiRoutes';
import CommonLayout from './pages/common/components/CommonLayout';
import ErrorPage from './pages/error/components/ErrorPage';
import { lazy } from 'react';
import SubscriptionHistoryPage from './pages/subscriptions/SubscriptionHistoryPage';
import SubDetailPage from './pages/subscriptions/SubDetailPage';

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
const SubscriptionPage = lazy(
  () => import('./pages/subscriptions/SubscriptionPage')
);
const OrderSubscriptionPage = lazy(
  () => import('./pages/subscriptions/OrderSubscriptionPage')
);
const SubscriptionSuccessPage = lazy(
  () => import('./pages/subscriptions/SubscriptionSuccessPage')
);
const SubscriptionReceiptPage = lazy(
  () => import('./pages/subscriptions/SubscriptionReceiptPage')
);

// import LoginPage from './pages/login/LoginPage';
// import ProductPage from './pages/products/ProductPage';
// import Mypage from './pages/mypage/Mypage';
// import CartPage from './pages/carts/CartPage';
// import OrderPage from './pages/order/OrderPage';
// import OrderReceiptPage from './pages/order/OrderReceiptPage';
// import ProfileEditPage from './pages/mypage/ProfileEditPage';
// import OrderHistoryPage from './pages/order/OrderHistoryPage';
// import ProductDetailPage from './pages/products/ProductDetailPage';
// import SuccessPage from './pages/order/SuccessPage';
// import { SubscriptionPage } from './pages/subscriptions/components/SubscriptionPage';

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
      {
        path: pageRoutes.subscription,
        element: <SubscriptionPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.subscriptionOrder,
        element: <OrderSubscriptionPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.subscriptionSuccess,
        element: <SubscriptionSuccessPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.subscriptionReceipt,
        element: <SubscriptionReceiptPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.subscriptionHistory,
        element: <SubscriptionHistoryPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: `${pageRoutes.subscriptionDetail}/:id`,
        element: <SubDetailPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
