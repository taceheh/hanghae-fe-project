import { Button } from '@/components/ui/button';

const OrderReceiptPage = () => {
  return (
    <div className="mt-6">
      <div className="text-center mb-10 pt-6">
        <p className="font-semibold">주문이 완료되었습니다.</p>
        <div className="text-xs mt-2">
          주문번호{' '}
          <span className="text-pointColor">dkhlskhdlk-394kjlkje3</span>
        </div>
      </div>
      <div className="  mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">주문상품정보</div>
        <div className="mt-6 mb-3 text-sm flex items-center">
          <div
            className="mr-4
      "
          >
            <img className="w-20 h-20" src="images/toss-logo.png" />
          </div>
          <div>
            <div className="mb-2 font-semibold">[스타벅스] 코스타리카</div>
            <div className="mb-2">250g / 2개 </div>
            <div>20000원</div>
          </div>
        </div>
      </div>

      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4">결제 정보</div>
        <div className=" mb-3 text-sm flex justify-between">
          <div className="w-full">
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">결제방법</div>
              <div className="w-[80%]">토스페이</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">주문상태</div>
              <div className="w-[80%]">토스페이</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">주문접수일시</div>
              <div className="w-[80%]">결제방법</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">배송비</div>
              <div className="w-[80%]">결제방법</div>
            </div>
            <div className="flex border-y-[1px] py-2">
              <div className="w-[20%]">결제금액</div>
              <div className="w-[80%]">결제방법</div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4">배송 정보</div>
        <div className=" mb-3 text-sm flex justify-between">
          <div className="w-full">
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">받으시는 분</div>
              <div className="w-[80%]">홍길동</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">휴대폰번호</div>
              <div className="w-[80%]">결제방법</div>
            </div>
            <div className="flex border-y-[1px] py-2">
              <div className="w-[20%]">주소</div>
              <div className="w-[80%]">결제방법</div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center align-middle bg-gray-100">
        <Button className="bg-customBlack text-white rounded-none font-medium text-xs p-2 w-[96%] hover:text-pointColor">
          원 구매하기
        </Button>
      </div>
    </div>
  );
};
export default OrderReceiptPage;
