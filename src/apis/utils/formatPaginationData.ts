/* eslint-disable import/prefer-default-export */
import type { CompactPagination, Pagination } from '@/apis/constants/pagination.type';

export const formatPaginationForUse = (pagination: Pagination | CompactPagination) => {
  if ('pageable' in pagination) {
    const {
      pageable: { pageNumber },
      last,
      totalElements,
      totalPages
    } = pagination;

    return {
      currentPage: pageNumber,
      isLastPage: last,
      totalElements,
      totalPages
    };
  }

  const { currentPage, totalPages, totalComments } = pagination;

  return {
    currentPage,
    isLastPage: currentPage >= totalPages,
    totalElements: totalComments,
    totalPages
  };
};
