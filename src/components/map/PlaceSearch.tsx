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

interface PlaceSearchProps {
  className?: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
}

export default function PlaceSearch({ className, onPlaceSelect }: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      <form onSubmit={(e) => e.preventDefault()}>
        <SearchInput
          className="mb-4"
          onClickSearchIcon={(searchString: string) => {
            setQuery(searchString);
          }}
          onClickRemoveIcon={() => setQuery('')}
          placeholder="장소를 입력해주세요."
        />
      </form>
      {error && !loading && <EmptyResultMessage>{error}</EmptyResultMessage>}
      {/* 장소 정보 */}
      <PlaceSearchResult query={query} places={places} onPlaceSelect={onPlaceSelect} loading={loading} />
    </div>
  );
}
