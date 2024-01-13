import { FC } from 'react';
import { RepoListing } from './components/repos/Listing';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <>
      <h1 className='mx-auto text-center fs-2 my-5'>Browse GitHub</h1>
      <RepoListing />
    </>
  );
};
