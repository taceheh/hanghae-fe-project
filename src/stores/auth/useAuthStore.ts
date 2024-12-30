import supabase from '@/supabase';
import { IUser } from '@/types/dto/userDTO';
import { create } from 'zustand';
import { AuthStore } from './types';

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
    const { data, error } = await supabase.auth.getSession();
    console.log('CheckSession Called:', data);
    if (error || !data?.session?.user) {
      set({ user: null, isLogin: false });
      return;
    }

    const userId = data.session.user.id;
    // api로 분리
    const getUserInfo = async () => {
      const { data, error } = await supabase
        .from('users') // Supabase 데이터베이스의 테이블 이름
        .select('id, name, email, phonenumber, address') // 필요한 칼럼만 선택
        .eq('id', userId) // ID로 필터링
        .single(); // 단일 결과만 가져옴

      console.log(userId);
      console.log(data);
      if (error) {
        console.error(
          'DB에서 사용자 정보를 가져오는 데 실패했습니다.',
          error.message
        );
        return null;
      }

      return data; // users 테이블에서 가져온 사용자 정보
    };
    set({
      user: await getUserInfo(),
      isLogin: true,
    });
    console.log('User set in Zustand:', getUserInfo());
  },
}));

export default useAuthStore;
