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
  seller_id: string;
}
export interface ProductResponse {
  data: ProductRelatedData[]; // 현재 페이지 데이터
  totalCount: number; // 총 데이터 개수
  page: number; // 현재 페이지 번호
}

export interface ProductRelatedData extends IProduct {
  isLiked: boolean;
  likeCount: number;
  reviewCount: number;
}
// export interface ProductRelatedData extends IProduct {
//   likes: TLikeSummary[];
//   reviews: TReviewSummary[];
// }

export interface TLikeSummary {
  product_id: string;
  user_id: string;
}

export interface TReviewSummary {
  user_id: string;
}
