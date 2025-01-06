import supabase from '@/supabase';
import { IUser } from '@/types/dto/userDTO';
import { create } from 'zustand';
import { AuthStore } from './types';
import { fetchUserInfo, getSession } from '@/api/auth';

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLogin: false,
  setIsLogin: (isLogin: boolean) =>
    set({
      isLogin,
    }),

  setUser: (user: IUser | null) =>
    set({
      user,
      isLogin: true,
    }),

  // 로그아웃
  logout: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      isLogin: false,
    });
  },
  checkSession: async () => {
    try {
      const sessionUser = await getSession();
      if (!sessionUser) {
        set({ user: null, isLogin: false });
        return;
      }

      const userInfo = await fetchUserInfo(sessionUser);
      set({ user: userInfo, isLogin: true });
    } catch (error) {
      console.error('Error checking session:', error);
      set({ user: null, isLogin: false });
    }
  },
}));

export default useAuthStore;
