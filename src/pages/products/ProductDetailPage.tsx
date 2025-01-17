import { useCartInsert } from '@/hooks/cart/useCartInsert';
import { useGetReviews } from '@/hooks/products/useGetReviews';
import { useIsLiked } from '@/hooks/products/useIsLiked';
import { useLike } from '@/hooks/products/useLike';
import { useProductDetail } from '@/hooks/products/useProductDetail';
import useAuthStore from '@/stores/auth/useAuthStore';
import { formatISOToDate, formatName } from '@/utils/dateFormat';
import { useState } from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import CartModal from './components/CartModal';

const ProductDetailPage = () => {
  const { id: productId } = useParams<{ id: string }>();
  const { user, isLogin } = useAuthStore();
  const navigate = useNavigate();

  const userId = user?.id;
  const [count, setCount] = useState(1);
  const [isCartModalOpen, setCartModalOpen] = useState(false);

  const { data: product, isLoading, error } = useProductDetail(productId!);
  const { data: isLiked } = isLogin ? useIsLiked(productId!, userId!) : {};
  const { mutate: likeMutate } = isLogin
    ? useLike(isLiked ?? false, productId!, userId!)
    : { mutate: () => {} }; // 빈 함수로 처리
  const { mutate: cartMutate } = useCartInsert();
  const { data: reviews } = useGetReviews(productId!);

  // 기본 검증
  if (!productId) return <div>잘못된 요청입니다.</div>;
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  console.log(reviews);
  // 상품 개수 갱신 함수
  const handleCountChange = (quantity: string) => {
    setCount(Number(quantity));
  };

  // 장바구니 추가 로직
  const addCartBtn = async () => {
    if (!user?.id || !product?.id) {
      console.error('유효한 사용자 또는 상품 정보가 없습니다.');
      return;
    }
    cartMutate(
      { userId: user?.id, product, count },
      {
        onSuccess: () => {
          setCartModalOpen(true);
        },
      }
    );
  };

  const handleLikeToggle = () => {
    if (!isLogin) {
      navigate('/login'); // 로그인 페이지로 이동
      return;
    }

    likeMutate();
  };
  // ProductDetailPage.tsx
  const handlePurchase = () => {
    if (!product || !product.id) {
      console.error('유효하지 않은 상품입니다.');
      return;
    }

    navigate('/order', {
      state: {
        isDirectPurchase: true,
        product: product,
        count: count,
      },
    });
  };

  return (
    <>
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setCartModalOpen(false)}
      />
      <div className="">
        <img
          // className="border border-emerald-50 w-[50%] g-50%]"
          className="w-full"
          alt="원두이미지"
          src={product?.image_url}
        />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="text-xs ">
              <span className="mr-1 py-1 px-2 font-bold rounded bg-clipColor2 ">
                {product?.origin}
              </span>
              <span className="py-1 px-2 bg-clipColor1 font-bold">
                {product?.flavor}
              </span>
            </div>
            {isLiked ? (
              <BiSolidHeart
                onClick={handleLikeToggle}
                className=" text-2xl text-pointColor z-50 cursor-pointer"
              />
            ) : (
              <BiHeart
                onClick={handleLikeToggle}
                className=" text-2xl text-gray-400 z-50 cursor-pointer"
              />
            )}
          </div>
          <div className="py-4"> {product?.name}</div>
          <div className="line-through text-sm text-gray-400">
            {product?.price}원
          </div>
          <div className="text-sm font-semibold text-pointColor">
            원두 구독시 최대 할인 가격
          </div>
          <div className=" font-medium text-2xl">
            <span className=" text-pointColor">20%</span> &nbsp;
            {Math.floor(((Number(product?.price) ?? 0) * 0.8) / 100) * 100}
            <span className="text-sm font-semibold">원</span>
          </div>
        </div>
      </div>
      <div className="p-4 justify-between flex">
        <input
          type="number"
          value={count}
          min={1}
          max={10}
          onChange={(e) => {
            handleCountChange(e.target.value);
          }}
        />
        <button
          className="w-[240px] p-2 text-xs border border-solid text-customBlack font-bold border-gray-200 rounded-none"
          onClick={addCartBtn}
        >
          장바구니 담기
        </button>
        <button
          className="w-[240px] border text-xs border-solid bg-customBlack rounded-none text-white font-bold"
          onClick={handlePurchase}
        >
          바로 구매하기
        </button>
      </div>
      <div className="mt-6 py-4 border-t-[1px] border-black">
        <div className="font-semibold pb-4">상품정보 한 눈에 보기</div>
        <div className=" mb-3 text-sm flex justify-between">
          <div className="w-full">
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">원산지</div>
              <div className="w-[80%]">{product?.origin}</div>
            </div>
            <div className="flex border-t-[1px] py-2">
              <div className="w-[20%]">중량</div>
              <div className="w-[80%]">{product?.weight}g</div>
            </div>
            <div className="flex border-y-[1px] py-2">
              <div className="w-[20%]">원두 특징</div>
              <div className="w-[80%]">{product?.flavor}</div>
            </div>
          </div>
        </div>
        <div className="font-semibold pt-8 pb-4">상품 정보 상세보기</div>
        <div className="text-sm pb-10 flex border-b-[1px]">
          {product?.description}
        </div>
      </div>
      {reviews?.length === 0 ? (
        <div className="my-10">
          <div className="font-semibold">리뷰</div>
          <div className="text-xs py-4">
            이 상품의 첫번째 리뷰를 작성해보세요.
            <br />
            작성해주신 리뷰는 고객들에게 큰 도움이 됩니다.
          </div>
        </div>
      ) : (
        <div className="pb-10">
          {/* TODO: ANY타입 고쳐야함 (타입생성해야할듯) */}
          <div className="font-semibold my-6">
            리뷰 ({reviews?.length}) ★★★★★
          </div>
          {reviews?.map((item: any) => (
            <div key={item.id} className="py-2  border-b-[1px]">
              <div className="flex justify-between mb-2">
                <div className=" text-xs">
                  ★★★★★ {formatName(item.users?.name)}
                </div>{' '}
                <div className=" text-xs">
                  {formatISOToDate(item.created_at)}
                </div>
              </div>
              <div className="text-sm">{item.comment}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
