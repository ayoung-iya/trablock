/* eslint-disable max-len */
/* eslint-disable no-undef */
import EmptyResultMessage from '@/components/map/EmptyResultMessage';
import PlaceSearchItem from '@/components/map/PlaceSearchItem';

interface PlaceSearchResultProps {
  className?: string;
  query: string;
  places: google.maps.places.PlaceResult[];
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  loading: boolean;
}

export default function PlaceSearchResult({
  className,
  query,
  places,
  onPlaceSelect,
  loading
}: PlaceSearchResultProps) {
  const containerStyle = `flex-col-center scrollbar-styled scrollbar-custom h-full w-full gap-4 overflow-auto max-md:mb-5 max-md:scrollbar-hide md:h-[24.75rem] ${className}`;

  // 로딩 중
  if (loading) {
    return (
      <div className={containerStyle}>
        <EmptyResultMessage>검색 중...</EmptyResultMessage>
      </div>
    );
  }

  // 쿼리 없을 때
  if (!query) {
    return (
      <div className={containerStyle}>
        <EmptyResultMessage>장소를 검색해주세요.</EmptyResultMessage>
      </div>
    );
  }

  // 쿼리 있을 때
  return (
    <div className={containerStyle}>
      {places.map((place) => (
        <PlaceSearchItem key={place.place_id} place={place} onPlaceSelect={onPlaceSelect} />
      ))}
    </div>
  );
}
