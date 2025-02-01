import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SubscriptionPage = () => {
  const navigate = useNavigate();

  const [selectedCoffee, setSelectedCoffee] = useState<string | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSelect = (
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    value: string
  ) => {
    setter(value);
  };

  const handlePayment = () => {
    navigate('/payment', {
      state: {
        coffee: selectedCoffee,
        weight: selectedWeight,
        duration: selectedDuration,
        interval: selectedInterval,
        quantity,
      },
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center text-lg font-bold">
        <img src="/images/coffee-bean-image.jpg" />
      </div>

      <div className="border-b-[1px]">
        <div className="text-gray-700 font-semibold pb-4">상세 정보</div>
        <div className="text-sm pb-8">
          - 당일 로스팅된 신선한 원두를 발송합니다.
          <br />
          - 격주 배송을 선택하면 2주에 한 번 정해진 용량이 발송됩니다.
          <br />
          - 구독 신청은 로그인 후 이용 가능합니다.
          <br />
          - 구독은 정기 결제가 아니며, 선택한 개월 수만큼의 결제가 한 번에
          이루어집니다.
          <br />
        </div>
      </div>

      <div>
        <div className="text-gray-700 font-semibold pb-4">원두 종류</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            '코스타리카 따라주',
            '케냐 AA',
            '에티오피아 예가체프',
            '과테말라 안티구아',
            '인도네시아 만델링',
            '콜롬비아 수프리모',
          ].map((coffee) => (
            <button
              key={coffee}
              className={`focus:outline-none border border-gray-300 rounded-none h-10 text-sm cursor-pointer hover:bg-[#ff480036] hover:border-gray-300 font-semibold ${
                selectedCoffee === coffee
                  ? 'border-pointColor border-2 text-customBlack'
                  : 'bg-white text-gray-300'
              }`}
              onClick={() => handleSelect(setSelectedCoffee, coffee)}
            >
              {coffee}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-gray-700 font-semibold pb-4">원두 무게</div>
        <div className="grid grid-cols-3 gap-3">
          {['500g', '1kg', '2kg', '3kg', '5kg', '10kg'].map((size) => (
            <button
              key={size}
              className={`focus:outline-none border border-gray-300 rounded-none h-10 text-sm cursor-pointer hover:bg-[#ff480036] hover:border-gray-300 font-semibold ${
                selectedWeight === size
                  ? 'border-pointColor border-2 text-customBlack'
                  : 'bg-white text-gray-300'
              }`}
              onClick={() => handleSelect(setSelectedWeight, size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-gray-700 font-semibold pb-4">기간</div>
        <div className="grid grid-cols-3 gap-3">
          {['3달', '6달', '12달'].map((duration) => (
            <button
              key={duration}
              className={`focus:outline-none border border-gray-300 rounded-none h-10 text-sm cursor-pointer hover:bg-[#ff480036] hover:border-gray-300 font-semibold ${
                selectedDuration === duration
                  ? 'border-pointColor border-2 text-customBlack'
                  : 'bg-white text-gray-300'
              }`}
              onClick={() => handleSelect(setSelectedDuration, duration)}
            >
              {duration}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-gray-700 font-semibold pb-4">배송 간격</div>
        <div className="grid grid-cols-2 gap-3">
          {['2주', '4주'].map((interval) => (
            <button
              key={interval}
              className={`focus:outline-none border border-gray-300 rounded-none h-10 text-sm cursor-pointer hover:bg-[#ff480036] hover:border-gray-300 font-semibold ${
                selectedInterval === interval
                  ? 'border-pointColor border-2 text-customBlack'
                  : 'bg-white text-gray-300'
              }`}
              onClick={() => handleSelect(setSelectedInterval, interval)}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>

      <input
        type="number"
        value={quantity}
        min={1}
        max={10}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border-none focus:outline-none rounded-none p-2 w-[98px] text-center"
      />
      <button
        className="bg-black text-white rounded-lg px-6 py-3 text-xs w-[470px] font-semibold disabled:bg-gray-400 hover:text-pointColor"
        onClick={handlePayment}
        disabled={
          !selectedCoffee ||
          !selectedWeight ||
          !selectedDuration ||
          !selectedInterval
        }
      >
        구매하기
      </button>
    </div>
  );
};
