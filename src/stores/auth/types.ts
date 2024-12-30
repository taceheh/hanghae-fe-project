import { IUser } from '@/types/dto/userDTO';

export interface AuthStore {
  isLogin: boolean;
  user: IUser | null;
  //   checkLoginStatus: () => Promise<void>;
  logout: () => void;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
  checkSession: () => Promise<void>;
}
