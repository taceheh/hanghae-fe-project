import { useProducts } from '@/hooks/products/useProducts';
import { IProduct } from '@/types/dto/productDTO';
import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/auth/useAuthStore';
import supabase from '@/supabase';
import { BiHeart, BiSolidCommentDetail, BiSolidHeart } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const ProductCardComponent = () => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts();
  // const { user, isLogin } = useAuthStore();
  // const handleLikeBtn = async (productId: string) => {
  //   if (isLogin) {
  //     if (isLiked) {
  //       const { error } = await supabase
  //         .from('likes')
  //         .delete()
  //         .eq('user_id', user?.id)
  //         .eq('product_id', productId);
  //       if (error) console.log('좋아요 실패 : ', error);
  //       setIsLiked(!isLiked);
  //       console.log('좋아요 취소');
  //     } else {
  //       const { error } = await supabase.from('likes').insert({
  //         user_id: user?.id,
  //         product_id: productId,
  //       });
  //       if (error) console.log('좋아요 실패 : ', error);
  //       setIsLiked(!isLiked);
  //       console.log('좋아요 등록');
  //     }
  //   } else {
  //     navigate('/login');
  //   }
  // };
  const handleLikeBtn = (productId: string) => {};
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-wrap justify-between">
      {' '}
      {/* 기존 UI의 Flexbox 유지 */}
      {data?.pages.map((page) =>
        page.data.map((item: IProduct) => (
          <div
            onClick={() => navigate(`product/${item.id}`)}
            className="w-[48%] mb-3 relative" // 기존 CSS 클래스 유지
            key={item.id}
          >
            <img
              src={item.image_url}
              alt="원두사진"
              className="w-full h-[290px]" // 기존 이미지 스타일 유지
              loading="lazy" // Lazy Loading 적용
            />
            <BiHeart
              onClick={(e) => {
                handleLikeBtn(item?.id);
                e.stopPropagation(); // 이벤트 버블링 방지
              }}
              className="absolute bottom-[8.5rem] right-2 text-2xl text-white z-50 cursor-pointer"
            />
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
                <BiSolidHeart className="inline " /> 0
              </div>
              <div>
                <BiSolidCommentDetail className="inline" /> 0
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
