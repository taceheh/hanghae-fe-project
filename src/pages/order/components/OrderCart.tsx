import { Button } from '@/components/ui/button';
import { useCartItems } from '@/hooks/cart/useCartItems';
import useAuthStore from '@/stores/auth/useAuthStore';
import useCartStore from '@/stores/cart/useCartStore';
import { addressFormat } from '@/utils/addressFromat';
import { calculateTotalAmount } from '@/utils/cartUtil';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderListComponent } from './OrderListItem';
import { PaymentWidget } from './PaymentWidget';
import { Postcode } from '@/pages/mypage/components/PostCode';
const OrderCartComponent = () => {
  const { selectedItems, clearSelectedItems } = useCartStore();

  const { user } = useAuthStore();
  const { data } = useCartItems();
  const navigate = useNavigate();
  // selectedItems의 id와 data의 id가 일치하는 애들만 필터링 해줄건데
  const filteredCartData = useMemo(() => {
    return data?.filter((item) => selectedItems.includes(item.id));
  }, [data, selectedItems]);
  const [recipient, setRecipient] = useState(user?.name || '');
  const [phoneNum, setPhoneNum] = useState(user?.phonenumber || '');
  const [postcode, setPostcode] = useState(user?.address?.zonecode || '');
  const [roadAddress, setRoadAddress] = useState(
    user?.address?.roadAddress || ''
  );
  const [detailAddress, setDetailAddress] = useState(
    user?.address?.detailAddress || ''
  );

  const [isFormValid, setIsFormValid] = useState(false);

  // 🚀 **입력값이 모두 채워졌는지 확인**
  useEffect(() => {
    setIsFormValid(
      !!recipient &&
        !!phoneNum &&
        !!postcode &&
        !!roadAddress &&
        !!detailAddress
    );
  }, [recipient, phoneNum, postcode, roadAddress, detailAddress]);
  const deliveryInfo = {
    recipient: recipient,
    address: addressFormat({
      zonecode: postcode,
      roadAddress: roadAddress,
      detailAddress: detailAddress,
    }),
    phoneNum: phoneNum,
  };

  const handleAddressComplete = (data: {
    postcode: string;
    address: string;
  }) => {
    setPostcode(data.postcode); // 우편번호 저장
    setRoadAddress(data.address); // 주소 저장
  };

  return (
    <div className="mt-6">
      <div className="  mx-4 py-4 border-t-[0.2rem] border-black">
        <div className="font-semibold pb-4 border-b-2">배송 정보</div>
        <div className="mt-6 mb-3 text-sm">
          <div className=" mb-4 flex">
            <div className="font-semibold mr-2">
              수령인 <span className="text-pointColor">*</span>
            </div>
            <input
              onChange={(e) => setRecipient(e.target.value)}
              value={recipient}
              className="w-[200px] mr-2 p-2 border-gray-300 border-[1px] mb-2"
            />
          </div>
          <div className="mb-4 flex">
            <div className="font-semibold mr-2">
              배송지 <span className="text-pointColor">*</span>
            </div>
            <div className="">
              <div>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="우편번호"
                  className="w-[200px] mr-2 p-2 border-gray-300 border-[1px] mb-2"
                />
                <Postcode onComplete={handleAddressComplete} />
              </div>
              <input
                type="text"
                value={roadAddress}
                onChange={(e) => setRoadAddress(e.target.value)}
                placeholder="주소"
                className="w-full p-2 border-gray-300 border-[1px] mb-2"
              />
              <input
                type="text"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="상세주소"
                className="w-full p-2 border-gray-300 border-[1px]"
              />
            </div>
          </div>
          <div className="font-semibold mb-2 flex">
            <div className="mr-2">
              연락처 <span className="text-pointColor">*</span>
            </div>
            <input
              onChange={(e) => setPhoneNum(e.target.value)}
              value={phoneNum}
              className="w-[200px] mr-2 p-2 border-gray-300 border-[1px] mb-2"
            />
          </div>
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

          {/* <Button className="w-[49%] border-gray-300 flex items-center justify-center">
            일반결제
          </Button> */}
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
          isFormValid={isFormValid}
          totalPrice={
            calculateTotalAmount(filteredCartData, selectedItems) + 3000
          }
          deliveryInfo={deliveryInfo}
        />
      </div>
    </div>
  );
};

export default OrderCartComponent;
