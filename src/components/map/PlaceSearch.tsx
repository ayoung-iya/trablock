/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

'use client';

import React from 'react';

import SearchInput from '@/components/common/input/SearchInput';
import EmptyResultMessage from '@/components/map/EmptyResultMessage';
import PlaceSearchResult from '@/components/map/PlaceSearchResult';
import useGoogleMapsPlaceSearch from '@/libs/hooks/useGoogleMapsPlaceSearch';

interface PlaceSearchProps {
  className?: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
}

export default function PlaceSearch({ className, onPlaceSelect }: PlaceSearchProps) {
  const { query, setQuery, places, error, loading } = useGoogleMapsPlaceSearch();

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
