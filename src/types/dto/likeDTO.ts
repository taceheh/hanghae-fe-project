export interface ILike {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}
export interface likeType {
  userId: string;
  productId: string;
  action: 'LIKE' | 'UNLIKE';
}
