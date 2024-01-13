import { FC, useState, useEffect } from 'react';

import { useGetRepos } from '../../hooks/useGetRepos';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { PaginatedItems } from '../PaginatedItems';
import { RepoDetail } from './Detail';

import { MOCK_DATA } from "../../constants/mockData";

export const RepoListing: FC = () => {
  const { getRepos, loading } = useGetRepos();
  const {get: getData, set: setData} = useLocalStorage("githubRepos");

  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState();
  const [visibilityMap, setVisibilityMap] = useState(() => JSON.parse(getData()) || {});

  const fetchRepos = ({ refetch = false } = {}) => {
    return getRepos({ query }).then((response) => {
      const { total_count } = response;
      setTotalPages(total_count);
      return response;
    });
  };

  useEffect(() => {
    if (currentPage > 0) {
      setTimeout(() => {
        setRepos(MOCK_DATA.items);
        setTotalPages(MOCK_DATA.total_count);
      }, 500);

      // fetchRepos({ refetch: true }).then((response) => {
      //   console.log(999, response);
      //   setRepos(response.items);
      // });
    }
  }, [currentPage]);

  useEffect(() => {
    setData(JSON.stringify(visibilityMap));
  }, [visibilityMap]);

  const onClickPage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const toggleRepoVisibility = (recordId: number, value: boolean) => {
    setVisibilityMap((currentState) => {
      return {
        ...currentState,
        [recordId]: value
      }
    })
  }

  return (
    <div className="repo-listing container w-100 justify-content-center mb-5">
      {repos.map(({ id, name, full_name, description, owner }) => {
        const disabledClass = visibilityMap[id] === false ? 'opacity-25' : '';
        return <div className={`my-5 mx-auto w-50 shadow ${disabledClass}`} key={id}>
            <RepoDetail
              key={id}
              id={id}
              name={name}
              fullName={full_name}
              owner={owner}
              description={description}
              visible={visibilityMap[id]}
              toggleVisibility={toggleRepoVisibility}
            />
        </div>
      })}
      <PaginatedItems
        currentPage={currentPage}
        totalPages={totalPages}
        onClickPage={onClickPage}
        className='justify-content-center mx-auto text-center'
      />
    </div>
  );
};
