import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/auth/useAuthStore';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
const customerKey = import.meta.env.VITE_TOSS_CUSTOMER_KEY;

export const SubscriptionPayment = ({
  totalPrice,
  isFormValid,
  deliveryInfo,
}: {
  totalPrice: number;
  isFormValid: boolean;
  deliveryInfo: any;
}) => {
  const { user } = useAuthStore();
  // selectedItems의 id와 data의 id가 일치하는 애들만 필터링 해줄건데

  const [payment, setPayment] = useState<any>(null); // payment 객체 상태
  // const totalAmount = console.log(deliveryInfo);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const paymentInstance = tossPayments.payment({
          customerKey,
        });
        setPayment(paymentInstance); // 초기화된 payment 객체 설정
      } catch (error) {
        console.error('Error initializing payment:', error);
      }
    };

    fetchPayment();
  }, []);

  const requestPayment = async () => {
    if (!payment) {
      console.error('Payment instance is not initialized yet.');
      return;
    }
    sessionStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));

    try {
      await payment.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: totalPrice,
        },
        orderId: uuidv4(), // 고유 주문번호
        orderName: deliveryInfo.coffee,
        successUrl: window.location.origin + '/subscription/success',
        failUrl: window.location.origin + '/fail',
        customerEmail: user?.email,
        customerName: deliveryInfo.recipient,
        customerMobilePhone: deliveryInfo.phoneNum,
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT',
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (error) {
      console.error('Payment request failed:', error);
    }
  };

  return (
    <Button
      onClick={() => requestPayment()}
      disabled={!isFormValid}
      className={`bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] 
    ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:text-pointColor'}`}
    >
      {totalPrice}원 구매하기
    </Button>
  );
};
