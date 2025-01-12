import { Button } from '@/components/ui/button';
import { useCartItems } from '@/hooks/cart/useCartItems';
import useAuthStore from '@/stores/auth/useAuthStore';

import useCartStore from '@/stores/cart/useCartStore';
import { useMemo } from 'react';
import { OrderListComponent } from './components/OrderListItem';
import { calculateTotalAmount } from '@/utils/calculateTotalAmount';
const OrderPage = () => {
  const { selectedItems, setSelectedItems } = useCartStore();
  const { user } = useAuthStore();
  const { data } = useCartItems();

  // selectedItems의 id와 data의 id가 일치하는 애들만 필터링 해줄건데
  const filteredCartData = useMemo(() => {
    return data?.filter((item) => selectedItems.includes(item.id));
  }, [data, selectedItems]);

  const handleOrderBtn = () => {};

  return (
    <div className="mt-6">
      <div className="  mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">배송 정보</div>
        <div className="mt-6 mb-3 text-sm">
          <div className="font-semibold mb-2">{user?.name}</div>
          <div className="mb-2">
            ({user?.address.zonecode})&nbsp;{user?.address.roadAddress}&nbsp;
            {user?.address.detailAddress}
          </div>
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
        <Button
          onClick={handleOrderBtn}
          className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor"
        >
          {calculateTotalAmount(filteredCartData, selectedItems) + 3000}원
          구매하기
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;
