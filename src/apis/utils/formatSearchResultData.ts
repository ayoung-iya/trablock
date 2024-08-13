/* eslint-disable camelcase */
import { SearchResponse, SearchResultContentData } from '@/apis/useSearch/search.type';

export const formatSearchContentDataFromResponse = (content: SearchResultContentData[]) => {
  return content.map(
    ({
      article_id,
      title,
      bookmark_count,
      cover_img_url,
      start_at,
      end_at,
      is_bookmarked,
      is_editable,
      locations,
      name,
      profile_img_url,
      travel_companion,
      travel_styles
    }) => {
      return {
        articleId: `${article_id}`,
        title,
        city: locations.map(({ city }) => city),
        startAt: start_at,
        endAt: end_at,
        travelCompanion: travel_companion,
        travelStyle: travel_styles,
        name,
        profileImageUrl: profile_img_url,
        thumbnailImageUrl: cover_img_url,
        bookmarkCount: bookmark_count,
        isBookmarked: is_bookmarked,
        isEditable: is_editable
      };
    }
  );
};

export const formatSearchDataFromResponse = ({ data }: SearchResponse) => {
  const formattedData = formatSearchContentDataFromResponse(data.content);

  return {
    content: formattedData,
    totalElements: data.total_elements,
    totalPages: data.total_pages,
    currentPage: data.pageable.page_number,
    isLastPage: data.last
  };
};
