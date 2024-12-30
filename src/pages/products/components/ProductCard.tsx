import { useEffect, useState } from 'react';
import supabase from '../../../supabase';
import { IProduct } from '@/types/dto/productDTO';
import { useNavigate } from 'react-router-dom';

const ProductCardComponent = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  // 상품 데이터 가져오기
  const fetchProduct = async () => {
    const { data } = await supabase.from('products').select();
    setData(data || []);
    console.log(data);
  };

  const moveToDetailPage = (id: string) => {
    navigate(`product/${id}`);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      {data.map((item) => (
        <div
          onClick={() => {
            moveToDetailPage(item.id);
          }}
          className="w-[48%]"
          key={item.id}
        >
          <img src="" alt="원두사진" className="" />
          <div>{item.name}</div>
          <div>{item.flavor}</div>
          <div>{item.price}</div>
          <div>
            <div>찜 아이콘 개수</div>
            <div>리뷰 아이콘 개수</div>
          </div>
          {/* <button onClick={fetchData}>확인</button> */}
        </div>
      ))}
    </>
  );
};

export default ProductCardComponent;
