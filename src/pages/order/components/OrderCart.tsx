import { Button } from '@/components/ui/button';
import { useCartItems } from '@/hooks/cart/useCartItems';
import useAuthStore from '@/stores/auth/useAuthStore';
import useCartStore from '@/stores/cart/useCartStore';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '@/types/dto/orderDTO';
import { calculateQuantity, calculateTotalAmount } from '@/utils/cartUtil';
import { useMemo, useState } from 'react';
import { OrderListComponent } from './OrderListItem';
import {
  useInsertOrder,
  useCartDetails,
  useInsertOrderItem,
} from '@/hooks/order/useOrder';
import { useNavigate } from 'react-router-dom';
import { useCartDelete } from '@/hooks/cart/useCartDelete';
import { PaymentWidget } from './PaymentWidget';
import { addressFormat } from '@/utils/addressFromat';
import { v4 as uuidv4 } from 'uuid';
const OrderCartComponent = () => {
  const { selectedItems, clearSelectedItems } = useCartStore();

  const { data: cartDetails } = useCartDetails(selectedItems);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItem } = useInsertOrderItem();
  const { mutate: deleteCart } = useCartDelete();
  const { user } = useAuthStore();
  const { data } = useCartItems();
  const navigate = useNavigate();
  // selectedItems의 id와 data의 id가 일치하는 애들만 필터링 해줄건데
  const filteredCartData = useMemo(() => {
    return data?.filter((item) => selectedItems.includes(item.id));
  }, [data, selectedItems]);

  const address = addressFormat({
    zonecode: user?.address.zonecode ?? '',
    roadAddress: user?.address.roadAddress ?? '',
    detailAddress: user?.address.detailAddress ?? '',
  });

  // const handleOrderBtn = async () => {
  //   if (!user?.id) {
  //     console.error('로그인 정보가 없습니다.');
  //     return;
  //   }
  //   // const cartId = selectedItems;
  //   const orderData = {
  //     // id: orderId,
  //     user_id: user.id,
  //     total_price: calculateTotalAmount(filteredCartData, selectedItems) + 3000,
  //     status: OrderStatus.주문완료,
  //     payment_method: PaymentMethod.신용카드,
  //     payment_status: PaymentStatus.결제완료,
  //     shipping_recipient: user.id,
  //     shipping_address: address,
  //     shipping_phone: user.phonenumber!,
  //     quantity: calculateQuantity(selectedItems),
  //   };
  //   insertOrder(orderData, {
  //     onSuccess: async (newOrder) => {
  //       console.log('주문 삽입 성공:', newOrder);

  //       const productData = cartDetails;
  //       if (!productData || productData.length === 0) {
  //         console.error('장바구니 데이터 없음');
  //         return;
  //       }
  //       console.log(productData);

  //       console.log(newOrder);
  //       insertOrderItem(
  //         { productData, orderId: newOrder.id },
  //         {
  //           onSuccess: () => {
  //             console.log('주문 항목 삽입 성공');
  //             deleteCart({ cartIds: selectedItems, userId: user.id });
  //             clearSelectedItems();

  //             navigate('/order/receipt', {
  //               state: { isSuccess: true, orderId: newOrder.id },
  //             });
  //           },
  //           onError: (error) => {
  //             console.error('주문 항목 삽입 실패:', error);
  //           },
  //         }
  //       );
  //     },
  //     onError: (error) => {
  //       console.error('주문 삽입 실패:', error);
  //     },
  //   });
  // };
  return (
    <div className="mt-6">
      <div className="  mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">배송 정보</div>
        <div className="mt-6 mb-3 text-sm">
          <div className="font-semibold mb-2">{user?.name}</div>
          <div className="mb-2">{address}</div>
          <div> {user?.phonenumber}</div>
          {/* <div>주문시 요청사항</div> */}
        </div>
      </div>
      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">상품 정보</div>

        {filteredCartData?.map((item) => (
          <OrderListComponent key={item.id} cart={item} />
        ))}
      </div>
      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">결제 방법</div>
        <div className="mt-6 mb-3 text-sm flex justify-between">
          <Button className="w-[49%] border-gray-300 flex items-center justify-center">
            <img
              className="w-4 h-4 mr-2"
              src="/images/toss-logo.png"
              alt="Toss Logo"
            />
            토스페이
          </Button>

          <Button className="w-[49%] border-gray-300 flex items-center justify-center">
            일반결제
          </Button>
        </div>
      </div>
      <div className="mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="flex justify-between  pb-4 border-b-2">
          <div className="font-semibold">결제 금액</div>
          <div className="font-bold text-pointColor">
            {calculateTotalAmount(filteredCartData, selectedItems) + 3000}원
          </div>
        </div>
        <div className="flex justify-between text-sm my-4">
          <div>
            <div className="mb-2">총 상품 금액</div>
            <div>배송비</div>
          </div>
          <div>
            <div className="mb-2 text-right">
              {calculateTotalAmount(filteredCartData, selectedItems)}원
            </div>
            <div>+3,000원</div>
          </div>
        </div>
        <div className="flex justify-between text-sm font-semibold py-4 border-t-2 ">
          <div className="">총 결제 금액</div>
          <div>
            {calculateTotalAmount(filteredCartData, selectedItems) + 3000}원
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center align-middle bg-gray-100">
        <PaymentWidget
          totalPrice={
            calculateTotalAmount(filteredCartData, selectedItems) + 3000
          }
        />
        {/* <Button
          onClick={handleOrderBtn}
          className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
        >
          {calculateTotalAmount(filteredCartData, selectedItems) + 3000}원
          구매하기
        </Button> */}
      </div>
    </div>
  );
};

export default OrderCartComponent;
