import returnFetch from 'return-fetch';

import API_URL from '../constants/url';
import { formatSearchDataFromResponse } from '../utils/formatSearchResultData';

const PAGE_SIZE = 10;

const options = {
  baseUrl: API_URL.API_BASE_URL,
  headers: {
    'authorization-token':
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjYsImV4cCI6MTcxOTI5MTAxNX0.j9KqAhwZN4eOrAAbub1AJ-s1DYa_9QNWqPHdKV4i7bI'
  }
};

const fetchService = returnFetch(options);

const searchService = {
  getSearchResults: async (keyword: string, order: string, page: number) => {
    const orderString = order === 'popularity' ? 'popularity' : '';
    const response = await fetchService(
      `api/v1/search/article?keyword=${keyword}&page=${page}&size=${PAGE_SIZE}&order=${orderString}`
    );

    const rawData = await response.json();
    const formatData = formatSearchDataFromResponse(rawData);

    return formatData;
  }
};

export default searchService;
