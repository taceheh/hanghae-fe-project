import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '../../error/components/ErrorPage';
import { ReactNode } from 'react';

interface RootErrorBoundaryProps {
  children: ReactNode;
}

export const RootErrorBoundary: React.FC<RootErrorBoundaryProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};
