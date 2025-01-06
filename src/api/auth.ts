import supabase from '@/supabase';

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Failed to get session:', error.message);
  }
  return data.session?.user.id || null;
};

export const fetchUserInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, phonenumber, address')
    .eq('id', userId)
    .single();

  console.log(userId);
  console.log(data);
  if (error)
    console.error(
      'DB에서 사용자 정보를 가져오는 데 실패했습니다.',
      error.message
    );

  return data; // users 테이블에서 가져온 사용자 정보
};
