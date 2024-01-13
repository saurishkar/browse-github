/*

  https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=10&page=1

*/
import { useCallback, useState } from 'react';

import { RECORDS_PER_PAGE } from '../constants/app-defaults';

const API_URL = 'https://api.github.com/search/repositories';

type apiOptions = {
  query: string;
  sort?: string;
  page?: number;
};

export const useGetRepos = (recordsPerPage?: number) => {
  const [isLoading, setisLoading] = useState(false);
  const fetchRepos = useCallback(
    ({ query = 'javascript', sort = 'stars' }: apiOptions) => {
      let url = API_URL;
      url += `?per_page=${recordsPerPage || RECORDS_PER_PAGE}`;
      if (query) {
        url += `&q=${query}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
      }
      setisLoading(true);

      return fetch(url)
        .then((response) => response.json())
        .finally(() => setisLoading(false));
    },
    [recordsPerPage]
  );

  return {
    loading: isLoading,
    getRepos: fetchRepos,
  };
};
