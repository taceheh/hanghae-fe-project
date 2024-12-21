import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '../../error/components/ErrorPage';

export const RootErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};
