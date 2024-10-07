import type { Pagination, UserContentPaginationParams } from '@/apis/constants/pagination.type';
import { fetchExtendedWithAuthToken } from '@/apis/interceptors/fetchExtended';
import type { Article } from '@/apis/useArticle/article.type';
import { formatPaginationForUse } from '@/apis/utils/formatPaginationData';

interface BookmarkResponse extends Pagination {
  content: Article[];
}

const BOOKMARK_SERVICE = Object.freeze({
  getUserBookmarks: async ({ userId, page, size }: UserContentPaginationParams) => {
    const { content, ...pagination } = await fetchExtendedWithAuthToken<BookmarkResponse>(
      `api/v1/bookmarks/${userId}?page=${page}&size=${size}`
    );

    return { content, ...formatPaginationForUse(pagination) };
  }
});

export default BOOKMARK_SERVICE;
