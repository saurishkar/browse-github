import { useState, FC, ReactElement } from 'react';

export const PaginatedItems: FC<{
  totalPages: number;
  currentPage: number;
  onClickPage: Function;
}> = ({ totalPages = 1, currentPage = 1, onClickPage }): ReactElement => {
  const [currentActiveStep, setCurrentActiveStep] = useState(0);

  if (totalPages === 1) return null;

  const onClickPrevious = () => {
    onClickPage(currentPage - 1);
  };

  const onClickNext = () => {
    onClickPage(currentPage + 1);
  };
  return (
    <div className="pagination-container">
      <button onClick={onClickPrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        {currentPage}/{totalPages}
      </span>
      <button onClick={onClickNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};
