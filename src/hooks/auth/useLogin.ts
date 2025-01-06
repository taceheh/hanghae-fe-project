import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@/api/auth';

export const useLogin = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserInfo(userId),
    enabled: !!userId, // userId가 있을 때만 호출
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
};
