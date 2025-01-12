import { ICartWithProduct } from '@/types/dto/cartDTO';

interface OrderListComponentProps {
  product: ICartWithProduct['product']; // ICartWithProduct에서 product만 사용
}

export const OrderListComponent = ({ product }: OrderListComponentProps) => {
  return (
    <div>
      <div>상품명: {product.name}</div>
      <div>브랜드명: {product.description}</div>
      <div>몇그램/개수: {product.origin}</div>
      <div>가격: {product.price}원</div>
    </div>
  );
};
