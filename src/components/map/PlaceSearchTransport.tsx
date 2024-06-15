/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

'use client';

import React, { useEffect, useState } from 'react';

import SearchInput from '@/components/common/input/SearchInput';
import EmptyResultMessage from '@/components/map/EmptyResultMessage';
import PlaceSearchResult from '@/components/map/PlaceSearchResult';

import ImageBox from '../common/ImageBox';

interface PlaceSearchProps {
  className?: string;
  onPlaceSelect: (firstPlace: google.maps.places.PlaceResult, secondPlace: google.maps.places.PlaceResult) => void;
}

export default function PlaceSearchTransport({ className, onPlaceSelect }: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstPlace, setFirstPlace] = useState<google.maps.places.PlaceResult | null>(null);

  const handleFirstPlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place) setFirstPlace(place);
    setQuery('');
  };

  const handleSecondPlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (firstPlace && place) onPlaceSelect(firstPlace, place);
  };

  useEffect(() => {
    const handleSearch = () => {
      setLoading(true); // 로딩 상태 시작

      try {
        if (!google || !google.maps || !google.maps.places) {
          console.log('Google Maps JavaScript API failed to load');
          throw new Error('서버에 연결할 수 없습니다.');
        }

        const service = new google.maps.places.PlacesService(document.createElement('div'));

        const request: google.maps.places.TextSearchRequest = {
          query,
          language: 'ko'
        };

        service.textSearch(request, (results, status) => {
          setLoading(false); // 로딩 상태 종료

          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPlaces(results);
            setError(null);
          } else {
            setPlaces([]);
            setError('검색 결과가 없습니다.');
          }
        });
      } catch (error: any) {
        setLoading(false); // 로딩 상태 종료
        console.error('Error loading Google Maps API', error);
        setError(error.message);
      }
    };

    if (query) {
      handleSearch();
    } else {
      setPlaces([]);
      setError(null);
    }
  }, [query]);

  return (
    <div className={className}>
      <p className="modal-h2 mb-3">장소 검색</p>
      <form className="" onSubmit={(e) => e.preventDefault()}>
        {/* 출발지 */}
        <p className="font-subtitle-3 mb-2 text-gray-01">출발지</p>
        {!firstPlace ? (
          <SearchInput
            className="mb-4"
            onClickSearchIcon={(searchString: string) => {
              setQuery(searchString);
            }}
            onClickRemoveIcon={() => setQuery('')}
            placeholder="출발지를 입력해주세요."
          />
        ) : (
          <>
            <div className="flex-row-center pb-4">
              {firstPlace.photos?.[0] ? (
                <ImageBox
                  className="size-14 rounded-md"
                  src={firstPlace.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })}
                  alt={firstPlace.name || 'Place Photo'}
                  width={56}
                  height={56}
                />
              ) : (
                <div className="size-[5.4375rem] bg-gray-02" />
              )}
              <div className="ml-3">
                <p className="font-subtitle-2 mb-1 line-clamp-1">{firstPlace.name}</p>
                <p className="font-caption-2 line-clamp-1 text-gray-01">{firstPlace.formatted_address}</p>
              </div>
            </div>
            <p className="font-subtitle-3 mb-2 text-gray-01">도착지</p>
            <SearchInput
              className="mb-4"
              onClickSearchIcon={(searchString: string) => {
                setQuery(searchString);
              }}
              onClickRemoveIcon={() => setQuery('')}
              placeholder="도착지를 입력해주세요."
            />
          </>
        )}
        {error && !loading && <EmptyResultMessage>{error}</EmptyResultMessage>}
        {/* 장소 정보 */}
        <PlaceSearchResult
          query={query}
          places={places}
          onPlaceSelect={!firstPlace ? handleFirstPlaceSelect : handleSecondPlaceSelect}
          loading={loading}
        />
      </form>
    </div>
  );
}
