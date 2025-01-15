import { useLocation } from 'react-router-dom';
import OrderCartComponent from './components/OrderCart';
import OrderDirectComponent from './components/OrderDirect';
const OrderPage = () => {
  const location = useLocation();
  const directPurchaseState = location.state?.isDirectPurchase; // 바로구매 여부
  const directPurchaseProduct = location.state?.product; // 바로구매 상품 데이터
  const directProductCount = location.state?.count; // 바로구매 상품 데이터
  return (
    <div>
      {directPurchaseState ? (
        <OrderDirectComponent
          product={directPurchaseProduct}
          count={directProductCount}
        />
      ) : (
        <OrderCartComponent />
      )}
    </div>
  );
};

export default OrderPage;
