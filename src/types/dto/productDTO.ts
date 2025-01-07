export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  origin: string;
  flavor: string;
  weight: number;
  image_url: string;
  created_at: string;
}
export interface ProductResponse {
  data: IProduct[]; // 현재 페이지 데이터
  totalCount: number; // 총 데이터 개수
  page: number; // 현재 페이지 번호
}
