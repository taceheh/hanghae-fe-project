import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCartDelete } from '@/hooks/cart/useCartDelete';
import {
  useCartDetails,
  useInsertOrder,
  useInsertOrderItem,
} from '@/hooks/order/useOrder';
import useCartStore from '@/stores/cart/useCartStore';
import { calculateQuantity } from '@/utils/cartUtil';
import useAuthStore from '@/stores/auth/useAuthStore';
import { OrderStatus, PaymentStatus } from '@/types/dto/orderDTO';

const SuccessPage = () => {
  const { selectedItems, clearSelectedItems } = useCartStore();
  const { data: cartDetails, isLoading: isCartDetailsLoading } =
    useCartDetails(selectedItems);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItem } = useInsertOrderItem();
  const { mutate: deleteCart } = useCartDelete();
  const { user } = useAuthStore();
  const [searchParams] = useSearchParams();
  const secretKey = import.meta.env.VITE_TOSS_SECRET_KEY;
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);

  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const storedDeliveryInfo = sessionStorage.getItem('deliveryInfo');
    if (storedDeliveryInfo) {
      setDeliveryInfo(JSON.parse(storedDeliveryInfo));
    } else {
      console.error('세션 스토리지에서 배송 정보를 찾을 수 없음.');
    }
  }, []);

  useEffect(() => {
    if (!isCartDetailsLoading && cartDetails && !isProcessing && deliveryInfo) {
      confirmPayment();
    }
  }, [isCartDetailsLoading, cartDetails, isProcessing, deliveryInfo]);

  const confirmPayment = async () => {
    if (!orderId || !paymentKey || !amount || !user?.id || isProcessing) {
      console.error('필요한 데이터가 누락되었거나 이미 처리 중입니다.');
      return;
    }
    if (!deliveryInfo) {
      console.error('배송 정보가 없습니다.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. 카트 데이터가 로드될 때까지 대기
      if (isCartDetailsLoading || !cartDetails) {
        console.log('카트 데이터 로딩 중...');
        return;
      }

      // 2. 결제 승인 요청
      const response = await fetch(
        `https://api.tosspayments.com/v1/payments/confirm`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${btoa(`${secretKey}:`)}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId,
            paymentKey,
            amount: Number(amount),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`결제 승인 실패: ${response.status}`);
      }

      const responseData = await response.json();

      // 3. 주문 데이터 생성
      const orderData = {
        id: orderId,
        user_id: user.id,
        total_price: responseData.totalAmount,
        status: OrderStatus.주문완료,
        payment_method: responseData.method,
        payment_status: PaymentStatus.결제완료,
        shipping_recipient: deliveryInfo.recipient,
        shipping_address: deliveryInfo.address,
        shipping_phone: deliveryInfo.phoneNum,
        quantity: calculateQuantity(selectedItems),
        paymentKey: paymentKey,
      };

      // 4. 주문 생성 및 주문 아이템 처리
      insertOrder(orderData, {
        onSuccess: (newOrder) => {
          if (!cartDetails || cartDetails.length === 0) {
            throw new Error('장바구니 데이터 없음');
          }

          insertOrderItem(
            { productData: cartDetails, orderId: newOrder.id },
            {
              onSuccess: () => {
                deleteCart({ cartIds: selectedItems, userId: user.id });
                clearSelectedItems();
                sessionStorage.removeItem('deliveryInfo');
                navigate('/order/receipt', {
                  state: { isSuccess: true, orderId: newOrder.id },
                });
              },
              onError: (error) => {
                console.error('주문 항목 삽입 실패:', error);
                setError('주문 항목 처리 중 오류가 발생했습니다.');
              },
            }
          );
        },
        onError: (error) => {
          console.error('주문 삽입 실패:', error);
          setError('주문 처리 중 오류가 발생했습니다.');
        },
      });
    } catch (error: any) {
      console.error('결제 승인 중 에러 발생:', error);
      setError(error.message || '알 수 없는 에러가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>결제 처리 중입니다...</h1>
      {error && <p style={{ color: 'red' }}>오류 발생: {error}</p>}
      {!error && !isProcessing && <p>결제가 성공적으로 완료되었습니다!</p>}
    </div>
  );
};

export default SuccessPage;
