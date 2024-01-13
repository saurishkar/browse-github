import { useState, FC, ReactElement } from 'react';

export const PaginatedItems: FC<{
  totalPages: number;
  currentPage: number;
  onClickPage: Function;
  className?: string;
}> = ({ totalPages = 1, currentPage = 1, onClickPage, className = "" }): ReactElement => {

  if (totalPages === 1) return null;

  const onClickPrevious = () => {
    onClickPage(currentPage - 1);
  };

  const onClickNext = () => {
    onClickPage(currentPage + 1);
  };
  return (
    <div className={`pagination-container ${className}`}>
      <button onClick={onClickPrevious} disabled={currentPage === 1} className='btn btn-sm btn-outline-dark mx-4'>
        Previous
      </button>
      <span>
        {currentPage}/{totalPages}
      </span>
      <button onClick={onClickNext} disabled={currentPage === totalPages} className='btn btn-sm btn-outline-dark mx-4'>
        Next
      </button>
    </div>
  );
};
