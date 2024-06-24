import { useQuery } from '@tanstack/react-query';

import bannerService from './fetch';
import { Article } from './type';

const useGetBanners = () => {
  return useQuery<Article[], Error>({
    queryKey: ['banners'],
    queryFn: bannerService.getBannerArticles
  });
};

export default useGetBanners;
