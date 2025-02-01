import { Button } from '@/components/ui/button';
import { useCartItems } from '@/hooks/cart/useCartItems';
import useAuthStore from '@/stores/auth/useAuthStore';
import useCartStore from '@/stores/cart/useCartStore';
import { calculateQuantity, calculateTotalAmount } from '@/utils/cartUtil';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const clientKey = 'test_ck_26DlbXAaV0Oam4R9M6Q43qY50Q9R';
const customerKey = 'uQSSlA-18kvqCx9FEavhR';

export const PaymentWidget = ({ totalPrice }: { totalPrice: number }) => {
  const { user } = useAuthStore();
  const { data } = useCartItems();
  const { selectedItems } = useCartStore();
  // selectedItems의 id와 data의 id가 일치하는 애들만 필터링 해줄건데
  const filteredCartData = useMemo(() => {
    return data?.filter((item) => selectedItems.includes(item.id));
  }, [data, selectedItems]);
  const [payment, setPayment] = useState<any>(null); // payment 객체 상태
  const totalAmount =
    calculateTotalAmount(filteredCartData, selectedItems) + 3000;
  // const [amount] = useState({
  //   currency: 'KRW',
  //   value: totalAmount,
  // });
  console.log(calculateTotalAmount(filteredCartData, selectedItems) + 3000);
  console.log(
    filteredCartData?.[0].product.name +
      ' 외 ' +
      (filteredCartData?.length! - 1) +
      '건'
  );

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

    try {
      await payment.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: totalAmount,
        },
        orderId: uuidv4(), // 고유 주문번호
        orderName:
          filteredCartData?.length === 1
            ? filteredCartData?.[0].product.name
            : filteredCartData?.[0].product.name +
              ' 외 ' +
              calculateQuantity(selectedItems) +
              '건',
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
        customerEmail: user?.email,
        customerName: user?.name,
        customerMobilePhone: user?.phonenumber,
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
      className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
    >
      {totalPrice}원 구매하기
    </Button>
  );
};
