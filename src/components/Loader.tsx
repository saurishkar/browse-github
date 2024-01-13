import { FC, ReactElement } from 'react';

export const Loader: FC<{
  loading: boolean;
  refetching: boolean;
  children: ReactElement;
}> = ({ loading = false, refetching = false, children }) => {
  if (loading) return <span>Loading...</span>;
  return (
    <span>
      {children}
      <div>Loading...</div>
    </span>
  );
};
