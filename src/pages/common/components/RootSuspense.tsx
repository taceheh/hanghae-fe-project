import React, { ReactNode, Suspense } from 'react';
import LoadingPage from '../../loading/components/LoadingPage';

interface RootSuspenseProps {
  children: ReactNode;
}

const RootSuspense: React.FC<RootSuspenseProps> = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};

export default RootSuspense;
