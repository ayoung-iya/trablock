import returnFetch from 'return-fetch';

import API_URL from '../constants/url';
import { formatSearchDataFromResponse } from '../utils/formatSearchResultData';

const PAGE_SIZE = 10;

const options = {
  baseUrl: API_URL.API_BASE_URL,
  headers: {
    'authorization-token':
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjYsImV4cCI6MTcxOTE5NzQ4MH0.HzJLzj3fZu5oz9B2l79TlabKN37YjO4IwVYFaFkvNY0'
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
