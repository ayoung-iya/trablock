export interface Pagination {
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface CompactPagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalComments: number;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort: 'createdAt,DESC' | 'popularity';
}

export interface UserContentPaginationParams extends Pick<PaginationParams, 'page' | 'size'> {
  userId: string;
}
