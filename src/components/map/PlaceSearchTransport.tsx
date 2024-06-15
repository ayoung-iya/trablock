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

import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/Dropdown';
import ImageBox from '@/components/common/ImageBox';
import SearchInput from '@/components/common/input/SearchInput';
import EmptyResultMessage from '@/components/map/EmptyResultMessage';
import PlaceSearchResult from '@/components/map/PlaceSearchResult';
import { Transport } from '@/components/modal/modalList/type';
import ChevronUpSvg from '@/icons/chevron-up.svg';
import { TRANSPORT_LIST } from '@/libs/constants/googleMaps';
import useDropdown from '@/libs/hooks/useDropdown';

interface PlaceSearchTransportProps {
  className?: string;
  onTransportSelect: (
    transport: Transport,
    firstPlace: google.maps.places.PlaceResult,
    secondPlace: google.maps.places.PlaceResult
  ) => void;
}

export default function PlaceSearchTransport({ className, onTransportSelect }: PlaceSearchTransportProps) {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstPlace, setFirstPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<Transport>(TRANSPORT_LIST[0]);
  const { ref, isDropdownOpened, handleDropdownToggle } = useDropdown({
    onClickInside: (e?: any) => {
      if (e?.target?.textContent) {
        setSelectedTransport(
          TRANSPORT_LIST.find((transport: Transport) => transport === e?.target?.textContent) || TRANSPORT_LIST[0]
        );
      }
    }
  });

  const handleFirstPlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place) setFirstPlace(place);
    setQuery('');
  };

  const handleSecondPlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (firstPlace && place) onTransportSelect(selectedTransport, firstPlace, place);
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
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-10">
          <p className="modal-h2 mb-3">교통수단</p>
          <Button
            className="font-body-2 flex-row-center w-full justify-between rounded-md border border-solid border-gray-01 px-4 py-3"
            onClick={(e: any) => {
              handleDropdownToggle(e);
            }}
          >
            <p className="">{selectedTransport}</p>
            <ChevronUpSvg width={18} height={18} className={!isDropdownOpened ? 'rotate-180' : ''} />
          </Button>
          {isDropdownOpened && (
            <div className="relative">
              <Dropdown className="absolute top-2 w-full" ref={ref}>
                {TRANSPORT_LIST.map((transport) => (
                  <li className="modal-dropdown cursor-pointer py-2 first:pt-0 last:pb-0" key={transport}>
                    {transport}
                  </li>
                ))}
              </Dropdown>
            </div>
          )}
        </div>
        <p className="modal-h2 mb-3">장소 검색</p>
        {/* 출발지 */}
        <p className="font-subtitle-3 mb-2 text-gray-01">출발지</p>
        {!firstPlace ? (
          <>
            {/* 출발지가 없을 때 */}
            <SearchInput
              className="mb-4"
              onClickSearchIcon={(searchString: string) => {
                setQuery(searchString);
              }}
              onClickRemoveIcon={() => setQuery('')}
              placeholder="출발지를 입력해주세요."
            />
          </>
        ) : (
          <>
            {/* 출발지가 있을 때 */}
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
            {/* 도착지 */}
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
