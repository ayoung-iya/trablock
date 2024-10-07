import type { CompactPagination, UserContentPaginationParams } from '@/apis/constants/pagination.type';
import { fetchExtendedWithAuthToken } from '@/apis/interceptors/fetchExtended';
import type { Article } from '@/apis/useArticle/article.type';
import { formatPaginationForUse } from '@/apis/utils/formatPaginationData';

export interface Review extends Pick<Article, 'title' | 'locations' | 'startAt' | 'endAt'> {
  reviewId: number;
  representativeImgUrl: string | null;
}

interface ReviewResponse extends CompactPagination {
  reviews: Review[];
}

const REVIEW_SERVICE = Object.freeze({
  getUserReviews: async ({ userId, page, size }: UserContentPaginationParams) => {
    const { reviews, ...pagination } = await fetchExtendedWithAuthToken<ReviewResponse>(
      `api/v1/users/${userId}/reviews?page=${page}&size=${size}`
    );

    return { reviews, ...formatPaginationForUse(pagination) };
  }
});

export default REVIEW_SERVICE;
