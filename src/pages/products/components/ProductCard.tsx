import { useEffect, useState } from 'react';
import { IProduct } from '@/types/dto/productDTO';
import { useNavigate } from 'react-router-dom';
import { BiHeart, BiSolidCommentDetail, BiSolidHeart } from 'react-icons/bi';
import { fetchProduct } from '@/api/products';

const ProductCardComponent = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  const getProduct = async () => {
    const products = await fetchProduct();
    setData(products);
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {data.map((item) => (
        <div
          onClick={() => navigate(`product/${item.id}`)}
          className="w-[48%] mb-3 relative"
          key={item.id}
        >
          <img
            src={item.image_url}
            alt="원두사진"
            className="w-full h-[290px]"
          />
          <BiHeart className="absolute bottom-[8.5rem] right-2 text-2xl text-white z-50 cursor-pointer" />
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
          {/* <button onClick={fetchData}>확인</button> */}
        </div>
      ))}
    </>
  );
};

export default ProductCardComponent;
