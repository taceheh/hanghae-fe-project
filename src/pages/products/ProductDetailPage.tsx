import { useCartInsert } from '@/hooks/cart/useCartInsert';
import { useGetReviews } from '@/hooks/products/useGetReviews';
import { useIsLiked } from '@/hooks/products/useIsLiked';
import { useLike } from '@/hooks/products/useLike';
import { useProductDetail } from '@/hooks/products/useProductDetail';
import useAuthStore from '@/stores/auth/useAuthStore';
import { useState } from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id: productId } = useParams<{ id: string }>();
  const { user, isLogin } = useAuthStore();
  const navigate = useNavigate();

  const userId = user?.id;
  const [count, setCount] = useState(1);

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
    cartMutate({ userId: user?.id, product, count });
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
      <div>
        원산지 맛설명 상품설명
        <div>{product?.description}</div>
      </div>
      <div className="p-4">리뷰요</div>
      {/* TODO: ANY타입 고쳐야함 (타입생성해야할듯) */}
      {reviews?.map((item: any) => (
        <div>
          <div>
            <div>{item.users?.name}</div>
            <div>{item.comment}</div>
            <div>{item.created_at}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetailPage;
