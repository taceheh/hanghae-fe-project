import { create } from 'zustand';
import supabase from '../supabase';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  initializeAuth: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      set({
        user: data.user,
        isAuthenticated: !!data.user,
      });
    } else {
      console.log('Failed to fetch user: ', error?.message);
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },

  // 로그아웃
  logout: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
