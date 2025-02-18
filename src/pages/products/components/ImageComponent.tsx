import { getOptimizedImageUrl } from '@/utils/imageOptimizer';
import { Helmet } from 'react-helmet';

const sizeClasses = {
  small: 'w-[100px] h-[100px]',
  medium: 'w-[290px] h-[290px]',
  large: 'w-[600px] h-[600px]',
};

export const ImageComponent = ({
  url = '',
  size,
  variant = 'medium', // 기본 크기를 medium으로 설정
}: {
  url?: string;
  size: number;
  variant?: 'small' | 'medium' | 'large'; // 크기 프리셋
}) => {
  const optimizedUrl = getOptimizedImageUrl(url, size, 80);
  const sizeClass = sizeClasses[variant]; // 선택한 프리셋 클래스 적용

  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={optimizedUrl} />
        <link
          rel="preconnect"
          href="https://nlksgzgzcjczbvsdkgxf.supabase.co"
        />
        <link
          rel="dns-prefetch"
          href="https://nlksgzgzcjczbvsdkgxf.supabase.co"
        />
      </Helmet>
      <img
        className={`object-cover ${sizeClass}`}
        src={optimizedUrl}
        alt="Optimized Image"
        loading="eager"
      />
    </>
  );
};
