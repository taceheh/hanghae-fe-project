import { useLike } from '@/hooks/products/useLike';
import { useProducts } from '@/hooks/products/useProducts';
import useAuthStore from '@/stores/auth/useAuthStore';
import { ProductRelatedData } from '@/types/dto/productDTO';
import { useEffect } from 'react';
import { BiHeart, BiSolidCommentDetail, BiSolidHeart } from 'react-icons/bi';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ImageComponent } from './ImageComponent';

const ProductCardComponent = () => {
  const navigate = useNavigate();
  const { user, isLogin } = useAuthStore();
  // const { data: isLiked } = isLogin ? useIsLiked(productId!, userId!) : {};
  const { mutate: likeMutate } = useLike(user?.id!);

  const { ref, inView } = useInView({
    threshold: 0.3, // footer가 완전히 보일 때만 감지
  });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts(
    user?.id!
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (inView && hasNextPage && !isFetchingNextPage) {
      timeoutId = setTimeout(() => {
        fetchNextPage();
      }, 50); // 300ms 디바운스
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [inView, hasNextPage, isFetchingNextPage]);

  const handleLikeToggle = (productId: string, isLiked: boolean) => {
    if (!isLogin) {
      navigate('/login'); // 로그인 페이지로 이동
      return;
    }

    likeMutate({ productId, isLiked, userId: user?.id! });
  };
  return (
    <div className="flex flex-wrap justify-between">
      {' '}
      {/* 기존 UI의 Flexbox 유지 */}
      {data?.pages.map((page) =>
        page.data.map((item: ProductRelatedData) => (
          <div
            onClick={() => navigate(`product/${item.id}`)}
            className="w-[48%] mb-3 relative" // 기존 CSS 클래스 유지
            key={item.id}
          >
            <ImageComponent url={item.image_url} size={290} variant="medium" />

            {item.isLiked ? (
              <BiSolidHeart
                onClick={(e) => {
                  handleLikeToggle(item.id, item.isLiked);
                  e.stopPropagation();
                }}
                className="absolute bottom-[8.5rem] right-2 text-2xl text-pointColor z-50 cursor-pointer"
              />
            ) : (
              <BiHeart
                onClick={(e) => {
                  handleLikeToggle(item.id, item.isLiked);
                  e.stopPropagation();
                }}
                className="absolute bottom-[8.5rem] right-2 text-2xl text-white z-50 cursor-pointer"
              />
            )}

            <div className="pt-3">{item.name}</div>
            <div className="font-medium mt-1">{item.price}원</div>
            {item.flavor === '고소함' ? (
              <span className="text-xs mr-1 pt-[0.2rem] pb-[0.15rem] px-2 font-bold text-customBlack rounded bg-clipColor1">
                {item.flavor}
              </span>
            ) : (
              <span className="text-xs mr-1 pt-[0.2rem] pb-[0.15rem] px-2 font-bold text-customBlack rounded bg-clipColor2">
                {item.flavor}
              </span>
            )}

            <div className="flex items-center text-xs text-gray-400 font-medium py-3">
              <div className="pr-2">
                <BiSolidHeart className="inline " /> {item.likeCount}
              </div>
              <div>
                <BiSolidCommentDetail className="inline" /> {item.reviewCount}
              </div>
            </div>
          </div>
        ))
      )}
      {hasNextPage ? (
        <footer ref={ref} className="flex justify-center w-full">
          <img className="w-20" src="/images/loading-spinner.gif" />
        </footer>
      ) : null}
    </div>
  );
};

export default ProductCardComponent;
