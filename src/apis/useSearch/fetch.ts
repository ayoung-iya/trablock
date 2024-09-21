import { Pagination } from '@/apis/constants/pagination.type';
import { fetchExtendedWithAuthToken } from '@/apis/interceptors/fetchExtended';
import { Article } from '@/apis/useArticle/article.type';

const PAGE_SIZE = 10;
interface SearchResults extends Pagination {
  content: Article[];
}

const searchService = {
  getSearchResults: async (keyword: string, order: string, page: number) => {
    const orderString = order === 'popularity' ? 'popularity' : '';
    const response = await fetchExtendedWithAuthToken<SearchResults>(
      `api/v1/search/article?keyword=${keyword}&page=${page}&size=${PAGE_SIZE}&sort=${orderString}`,
      {
        method: 'GET'
      }
    );

    return response;
  }
};

export default searchService;
