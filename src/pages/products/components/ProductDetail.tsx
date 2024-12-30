import supabase from '@/supabase';
import { IProduct } from '@/types/dto/productDTO';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id: productId } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);

  const fetchProductData = async () => {
    const { data, error } = await supabase
      .from('products')
      .select()
      .eq('id', productId)
      .single();
    if (data) {
      setProduct(data);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductData();
    // console.log(productId);
    // console.log(product);
  }, []);

  const [count, setCount] = useState(1);
  const handleCountChange = (quantity: string) => {
    setCount(Number(quantity));
  };

  return (
    <>
      <div className="flex p-4">
        <div>
          <img
            className="border border-emerald-50 w-[50%] g-50%]"
            alt="원두이미지"
            src={product?.image_url}
          />
        </div>
        <div>
          <div>{product?.name}</div>
          <div>{product?.origin}</div>
          <div>{product?.flavor}</div>
          <div>{product?.price}</div>
          <div>{product?.description}</div>
        </div>
      </div>
      <div className="p-4">
        <input
          type="number"
          value={count}
          min={1}
          max={10}
          onChange={(e) => {
            handleCountChange(e.target.value);
          }}
        />
        <button>장바구니</button>
        <button>바로구매</button>
      </div>
      <div className="p-4">리뷰요</div>
    </>
  );
};

export default ProductDetailPage;
