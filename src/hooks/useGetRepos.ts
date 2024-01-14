/*

  https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=10&page=1

*/
import { useCallback, useState } from 'react';

import { RECORDS_PER_PAGE } from '../constants/app-defaults';
import { MOCK_DATA } from '../constants/mockData';

const API_URL = 'https://api.github.com/search/repositories';

type apiOptions = {
  query?: string;
  sort?: string;
  page: number;
};

export const useGetRepos = (recordsPerPage?: number) => {
  const [isLoading, setisLoading] = useState(true);
  const fetchRepos = useCallback(
    ({ query = 'javascript', sort = 'stars', page }: apiOptions): Promise<{ total_count: number; items: object[] }> => {
      let url = API_URL;
      url += `?per_page=${recordsPerPage || RECORDS_PER_PAGE}`;
      if (query) {
        url += `&q=${query}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
      }
      if(page) {
        url += `&page=${page}`;
      }
      setisLoading(true);

      /* To simulate with MOCK_DATA in case rate limit is reached */
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve(MOCK_DATA);
      //   }, 500);
      // }).then((response: { total_count: number; items: object[] }) => {
      //   setisLoading(false);
      //   console.log("MOCK DATA IS BEING USED");
      //   return response;
      // });
      /* MOCK_DATA ends here */

      return fetch(url)
        .then((response) => {
          setisLoading(false);
          return response.json();
        })
        .catch((err) => {
          setisLoading(false);
          throw err;
        });
    },
    [recordsPerPage]
  );

  return {
    loading: isLoading,
    getRepos: fetchRepos,
  };
};
