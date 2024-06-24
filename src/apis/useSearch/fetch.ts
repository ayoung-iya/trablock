import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import getAuthToken from '@/apis/utils/getAuthToken';

import API_URL from '../constants/url';
import { formatSearchDataFromResponse } from '../utils/formatSearchResultData';

const PAGE_SIZE = 10;

const options: ReturnFetchDefaultOptions = {
  baseUrl: API_URL.API_BASE_URL,
  headers: {}
};

const fetchService = returnFetch(options);

const searchService = {
  getSearchResults: async (keyword: string, order: string, page: number) => {
    const authToken = getAuthToken();
    const orderString = order === 'popularity' ? 'popularity' : '';
    const response = await fetchService(
      `api/v1/search/article?keyword=${keyword}&page=${page}&size=${PAGE_SIZE}&order=${orderString}`,
      {
        method: 'GET',
        headers: {
          'authorization-token': authToken
        }
      }
    );

    const rawData = await response.json();
    const formatData = formatSearchDataFromResponse(rawData);

    return formatData;
  }
};

export default searchService;
