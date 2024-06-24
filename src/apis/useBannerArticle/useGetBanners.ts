import { useQuery } from '@tanstack/react-query';

import bannerService from './fetch';
import reviewService from './reviewFetch';
import { Article, Review } from './type';

const useGetBanners = () => {
  return useQuery<Article[], Error>({
    queryKey: ['banners'],
    queryFn: bannerService.getBannerArticles
  });
};

const useGetReviewBanners = () => {
  return useQuery<Review[], Error>({
    queryKey: ['reviewBanners'],
    queryFn: reviewService.getReviews
  });
};

export { useGetBanners, useGetReviewBanners };
