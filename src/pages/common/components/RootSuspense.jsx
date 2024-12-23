import React, { Suspense } from 'react';
import LoadingPage from '../../loading/components/LoadingPage';

const RootSuspense = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};

export default RootSuspense;
