/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';

import Map from '@/components/map/Map';
import { Coordinate } from '@/components/map/type';
import { TransportBlockDetailData } from '@/components/modal/modalList/type';
import { MODAL_MAP_STYLE } from '@/libs/constants/mapStyle';
import useCoordinateList from '@/libs/hooks/useCoordinateList';
import { GoogleMapsApiReturn } from '@/libs/hooks/useGoogleMapsApi';
import useGoogleMapsPlaceDetails from '@/libs/hooks/useGoogleMapsPlaceDetails';

interface BlockDetailModalContentTransportProps extends GoogleMapsApiReturn {
  blockData: TransportBlockDetailData;
}

export default function BlockDetailModalContentTransport({
  blockData,
  isLoaded
}: BlockDetailModalContentTransportProps) {
  const { placeId, secondPlaceId } = blockData;
  const { place, error: placeError, loading: placeLoading } = useGoogleMapsPlaceDetails(placeId);
  const {
    place: secondPlace,
    error: secondPlaceError,
    loading: secondPlaceLoading
  } = useGoogleMapsPlaceDetails(secondPlaceId);
  const { coordinateList, setCoordinateList } = useCoordinateList();

  useEffect(() => {
    if (place?.geometry?.location && secondPlace?.geometry?.location) {
      const newCoordinateList: Coordinate[] = [
        { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
        { lat: secondPlace.geometry.location.lat(), lng: secondPlace.geometry.location.lng() }
      ];
      setCoordinateList(newCoordinateList);
    }
  }, [place, secondPlace]);

  useEffect(() => {
    console.log('Detail coordinateList', coordinateList);
  }, [coordinateList]);

  if (!place || !secondPlace || placeError || secondPlaceError) return null;
  if (!isLoaded || placeLoading || secondPlaceLoading) return <div className={`bg-gray-02 ${MODAL_MAP_STYLE}`} />;
  return (
    <>
      <div className="mb-3 md:mb-4">
        <Map mapContainerStyle={MODAL_MAP_STYLE} coordinateList={coordinateList} category={blockData.category} />
      </div>
      <div className="mb-2 rounded-[0.3125rem] bg-gray-03 px-5 py-4">
        <p className="font-subtitle-2 mb-3">
          출발지<span className="font-caption-1 ml-3 text-black-03">{place.name}</span>
        </p>
        <p className="font-subtitle-2">
          주소<span className="font-caption-1 ml-3 break-words text-black-03">{place.formatted_address}</span>
        </p>
      </div>
      <div className="rounded-[0.3125rem] bg-gray-03 px-5 py-4">
        <p className="font-subtitle-2 mb-3">
          도착지<span className="font-caption-1 ml-3 text-black-03">{secondPlace.name}</span>
        </p>
        <p className="font-subtitle-2">
          주소<span className="font-caption-1 ml-3 break-words text-black-03">{secondPlace.formatted_address}</span>
        </p>
      </div>
    </>
  );
}
