import { BiX } from 'react-icons/bi';
const CartItemComponent = () => {
  return (
    <>
      <div className="">
        <div className=" px-4">
          <input type="checkbox" /> 전체 선택
        </div>
        <div className="flex align-baseline m-2 px-2 py-4 border-t-[0.2rem]  border-black">
          <div className="mr-3">
            <input type="checkbox" />
          </div>
          <div className="w-full">
            <div className="flex justify-between w-full">
              <div>[스타벅스] 코스타리카 따라주</div>
              <BiX className="text-2xl text-gray-400 " />
            </div>
            <div>250g / 1개</div>
            <div>19,900원</div>
            <button> 옵션 변경</button>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center align-middle bg-gray-100 ">
        <button className="bg-customBlack text-white rounded-none font-midium text-xs p-2 w-[96%]">
          99999원 구매하기
        </button>
      </div>
    </>
  );
};

export default CartItemComponent;
