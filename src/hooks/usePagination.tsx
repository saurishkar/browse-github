import { useState } from 'react';

export const usePagination = ({ totalPages = 1, currentPage = 1, on }) => {
  const [currentActiveStep, setCurrentActiveStep] = useState(0);
  const renderStep = () => {};
  if (totalPages === 1) return '';

  const onClickPrevious = () => {

  }

  const onClickNext = () => {

  }
  return (
    <div className="pagination-container">
      <a role-="button" onClick={onClickPrevious}>
        Previous
      </a>
      <span>
        {currentPage}/{totalPages}
      </span>
      <a role="button" onClick={onClickNext}>
        Next
      </a>
    </div>
  );
};
