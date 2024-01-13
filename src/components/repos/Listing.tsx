import { FC, useState, useEffect } from 'react';

import { useGetRepos } from '../../hooks/useGetRepos';

import { PaginatedItems } from '../PaginatedItems';
import { RepoDetail } from './Detail';

export const RepoListing: FC = () => {
  const { getRepos, loading } = useGetRepos();
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState();

  const fetchRepos = ({ refetch = false } = {}) => {
    return getRepos({ query }).then((response) => {
      const { total_count } = response;
      setTotalPages(total_count);
      return response;
    });
  };

  useEffect(() => {
    if (currentPage > 0) {
      fetchRepos({ refetch: true }).then((response) => {
        console.log(999, response);
        setRepos(response.items);
      });
    }
  }, [currentPage]);

  const onClickPage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="repo-listing container">
      {repos.map(({ id, name, full_name, description, owner }) => (
        <RepoDetail
          key={id}
          name={name}
          fullName={full_name}
          owner={owner}
          description={description}
        />
      ))}
      <PaginatedItems
        currentPage={currentPage}
        totalPages={totalPages}
        onClickPage={onClickPage}
      />
    </div>
  );
};
