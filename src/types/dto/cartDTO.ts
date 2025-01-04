import { IProduct } from './productDTO';

export interface ICart {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  price: string;
  created_at: string;
}
export interface ICartWithProduct extends ICart {
  product: IProduct; // ICart에 IProduct를 포함
}
