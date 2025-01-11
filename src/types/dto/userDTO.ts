export interface IUser {
  id: string;
  email: string;
  name: string;
  phonenumber: string | null;
  address: IAddress;
  // address: JSON | null;
  // created_at: string;
}
interface IAddress {
  detailAddress: string;
  roadAddress: string;
  zonecode: string;
}
