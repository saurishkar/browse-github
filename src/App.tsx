import { FC } from 'react';
import { RepoListing } from './components/repos/Listing';

import './style.css';

export const App: FC = () => {
  return (
    <>
      <h1 className='mx-auto text-center fs-2 my-5' data-testid="app-title">Browse &#128269; GitHub</h1>
      <RepoListing />
    </>
  );
};
