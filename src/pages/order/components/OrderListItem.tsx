import { ICartWithProduct } from '@/types/dto/cartDTO';

interface OrderListComponentProps {
  cart: ICartWithProduct; // ICartWithProduct에서 product만 사용
}

export const OrderListComponent = ({ cart }: OrderListComponentProps) => {
  // useEffect(() => {
  //   console.log(cart);
  // }, []);
  return (
    <div className="mt-6 mb-3 text-sm flex items-center">
      <div className="mr-4">
        <img className="w-20 h-20" src={cart.product.image_url} />
      </div>
      <div>
        <div className="mb-2 font-semibold">[스타벅스] {cart.product.name}</div>
        <div className="mb-2">
          {cart.product.weight}g / {cart.quantity}개{' '}
        </div>
        <div>{cart.price}원</div>
      </div>
    </div>
  );
};
