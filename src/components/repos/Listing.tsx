import { FC, useState, useEffect, ReactElement } from 'react';

import { useGetRepos } from '../../hooks/useGetRepos';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { PaginatedItems } from '../PaginatedItems';
import { RepoDetail } from './Detail';

import { RECORDS_PER_PAGE } from '../../constants/app-defaults';

export const RepoListing: FC = () => {
  const { getRepos, loading } = useGetRepos(RECORDS_PER_PAGE);
  const {get: getData, set: setData} = useLocalStorage("githubRepos");

  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [visibilityMap, setVisibilityMap] = useState(() => JSON.parse(getData()) || {});

  const fetchRepos = () => {
    setError('');
    return getRepos({ page: currentPage }).then((response) => {
      const { total_count } = response;
      setTotalPages(total_count);
      return response;
    });
  };

  useEffect(() => {
    if (currentPage > 0) {
      fetchRepos().then((response) => {
        setRepos(response.items);
      }).catch((err) => {
        setError(err);
      });
    }
  }, [currentPage]);

  useEffect(() => {
    setData(JSON.stringify(visibilityMap));
  }, [visibilityMap]);

  const onClickPage = (pageNum: number) => {
    if(loading || error) return;
    setCurrentPage(pageNum);
  };

  const toggleRepoVisibility = (recordId: number, value: boolean) => {
    setVisibilityMap((currentState: object) => {
      return {
        ...currentState,
        [recordId]: value
      }
    })
  }

  const resultStartIdx = currentPage === 1 ? 1 : (currentPage - 1) * RECORDS_PER_PAGE + 1;
  const resultEndIdx = currentPage * RECORDS_PER_PAGE;

  const renderResults = (): ReactElement => {
    if(error) {
      return <div className='error-block mx-auto text-center'>
        <h4 className='fs-4 text-danger'>Error!</h4>
        <p className='fs-5'>{error || "There was an error processing the request."}</p>
        <button onClick={fetchRepos} className='btn btn-primary btn-sm'>Retry</button>
      </div>
    }

    if(loading) {
      return <div className='d-flex justify-content-center h-100 align-items-center'>
        <span className='react-loader'>&#9883;</span>
      </div>
    }

    if(repos.length === 0) return <h5 className='text-center'>
      <span><span className='text-danger fs-3'>&#215;</span> No Repositories Found</span>
    </h5>

    return <>
      <p className='text-center'>Showing {resultStartIdx} - {resultEndIdx} results</p>
      {repos.map(({ id, name, full_name, description, owner }) => {
        const disabledClass = visibilityMap[id] === false ? 'opacity-25' : '';
        return <div className={`repo-detail mb-5 mx-auto shadow ${disabledClass}`} key={id}>
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
    </>
  }

  return (
    <div className="repo-listing container w-100 justify-content-center mb-5">
      <div className='w-50 mx-auto b'>
        <div className='h-75 overflow-y-auto overflow-x-hidden'>{renderResults()}</div>
        <PaginatedItems
          currentPage={currentPage}
          totalPages={totalPages}
          onClickPage={onClickPage}
          className='justify-content-center mx-auto mt-3 text-center'
        />
      </div>
    </div>
  );
};
