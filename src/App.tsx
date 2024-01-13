import { FC } from 'react';
import { RepoListing } from './components/repos/Listing';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <>
      <h1 className="text-center">Browse GitHub</h1>
      <RepoListing />
    </>
  );
};
