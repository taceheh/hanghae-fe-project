import {
  useInsertSubscription,
  useInsertSubscriptionItem,
} from '@/hooks/order/useSubscribe';
import useAuthStore from '@/stores/auth/useAuthStore';
import { OrderStatus, PaymentStatus } from '@/types/dto/orderDTO';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SubscriptionSuccessPage = () => {
  const { mutate: insertSubscription } = useInsertSubscription();
  const { mutate: insertSubscriptionItem } = useInsertSubscriptionItem();
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
      console.log('✅ 세션 스토리지에서 배송 정보 로드:', storedDeliveryInfo);
      setDeliveryInfo(JSON.parse(storedDeliveryInfo));
    } else {
      console.error('🚨 세션 스토리지에서 배송 정보를 찾을 수 없음.');
    }
  }, []);

  useEffect(() => {
    if (!isProcessing && deliveryInfo) {
      confirmPayment();
    }
  }, [isProcessing, deliveryInfo]);

  const calculateEndDate = (duration: number, interval: number): string => {
    const startDate = new Date(); // 현재 날짜
    const endDate = new Date(startDate); // 복사하여 사용

    // duration(개월)을 더함
    endDate.setMonth(endDate.getMonth() + duration);

    // interval(2주, 4주)에 따라 추가 일수 계산
    endDate.setDate(endDate.getDate() + interval);

    return endDate.toISOString(); // ISO 형식으로 반환
  };

  const confirmPayment = async () => {
    if (!orderId || !paymentKey || !amount || !user?.id || isProcessing) {
      console.error('필요한 데이터가 누락되었거나 이미 처리 중입니다.');
      return;
    }
    if (!deliveryInfo) {
      console.error('🚨 배송 정보가 없습니다.');
      return;
    }

    setIsProcessing(true);

    try {
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

      const subData = {
        id: orderId,
        user_id: user.id,
        paymentKey: paymentKey,
        status: OrderStatus.주문완료,
        payment_method: responseData.method,
        payment_status: PaymentStatus.결제완료,
        shipping_recipient: deliveryInfo.recipient,
        shipping_address: deliveryInfo.address,
        shipping_phone: deliveryInfo.phoneNum,
        quantity: deliveryInfo.quantity,
        total_price: responseData.totalAmount,
      };
      const end_date = calculateEndDate(
        deliveryInfo.duration,
        deliveryInfo.interval
      );
      // 4. 주문 생성 및 주문 아이템 처리
      insertSubscription(subData, {
        onSuccess: (newSub) => {
          insertSubscriptionItem(
            {
              itemData: {
                subscription_id: newSub.id,
                bean_type: deliveryInfo.coffee,
                bean_weight: deliveryInfo.weight,
                duration: deliveryInfo.duration,
                delivery_interval: deliveryInfo.interval,
                start_date: new Date().toISOString(),
                end_date: end_date,
                quantity: deliveryInfo.quantity,
              },
            },
            {
              onSuccess: () => {
                sessionStorage.removeItem('deliveryInfo');
                navigate('/subscription/receipt', {
                  state: { isSuccess: true, orderId: newSub.id },
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

export default SubscriptionSuccessPage;
