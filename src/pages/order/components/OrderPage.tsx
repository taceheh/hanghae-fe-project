import { Button } from '@/components/ui/button';
const OrderPage = () => {
  return (
    <div>
      <div className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black">
        <div>
          <p>배송 정보</p>
          <div>
            <div>홍길동</div>
            <div>주소지</div>
            <div>핸드폰 번호</div>
            <div>주문시 요청사항</div>
          </div>
        </div>
      </div>
      <div className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem] border-black">
        <div>
          <p>상품 정보</p>
          <div>
            <div>상품명</div>
            <div>브랜드명</div>
            <div>몇그램/개수</div>
            <div>가격</div>
          </div>
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
          {/* {calculateTotalAmount()}원 구매하기 */}
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;
