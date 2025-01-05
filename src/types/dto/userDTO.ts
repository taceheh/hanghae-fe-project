export interface IUser {
  id: string;
  email: string;
  name: string;
  phonenumber: string | null;
  address: JSON | null;
  // created_at: string;
}
