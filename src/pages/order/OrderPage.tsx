import { Button } from '@/components/ui/button';
import { useCartItems } from '@/hooks/cart/useCartItems';
import useAuthStore from '@/stores/auth/useAuthStore';

import useCartStore from '@/stores/cart/useCartStore';
import { useEffect } from 'react';
import { OrderListComponent } from './components/OrderListItem';
import { calculateTotalAmount } from '@/utils/calculateTotalAmount';
const OrderPage = () => {
  const { selectedItems, setSelectedItems } = useCartStore();
  const { user } = useAuthStore();
  const { data } = useCartItems();
  // selectedItems의 id와 data의 id가 일치하는 애들만 필터링 해줄건데
  const filteredCartData = data?.filter((item) =>
    selectedItems.includes(item.id)
  );
  useEffect(() => {
    console.log('filtered', filteredCartData);
    console.log(user?.address);
  }, []);
  return (
    <div>
      <div className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black">
        <div>
          <p>배송 정보</p>
          <div>
            <div>{user?.name}</div>
            <div>
              {user?.address.roadAddress}&nbsp;
              {user?.address.zonecode}&nbsp;
              {user?.address.detailAddress}
            </div>
            <div> {user?.phonenumber}</div>
            <div>주문시 요청사항</div>
          </div>
        </div>
      </div>
      <div className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black">
        <div>
          <p>상품 정보</p>

          {filteredCartData?.map((item) => (
            <OrderListComponent key={item.id} product={item.product} />
          ))}
        </div>
      </div>
      <div className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black">
        <div>
          <p>결제 방법</p>
          <input type="radio" name="payment" value="credit" id="credit" />
          <label className="pl-2 pr-8" htmlFor="credit">
            일반결제
          </label>
          <input type="radio" name="payment" value="tosspay" />{' '}
          <label className="pl-2 pr-8" htmlFor="credit">
            토스페이
          </label>
        </div>
      </div>
      <div className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black">
        <div>
          <div>
            <div>결제 금액 32,900원</div>
            <div>총 상품 금액 28,900원</div>
            <div>배송비 +4,000원</div>
            <div>총 결제 금액 32,900원</div>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center align-middle bg-gray-100">
        <Button className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor">
          {calculateTotalAmount(filteredCartData, selectedItems)}원 구매하기
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;
