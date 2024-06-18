/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import ImageBox from '@/components/common/ImageBox';
import { PlaceBlockDetailData } from '@/components/modal/modalList/type';
import { MODAL_MAP_STYLE } from '@/libs/constants/mapStyle';
import useCoordinateList from '@/libs/hooks/useCoordinateList';
import { GoogleMapsApiReturn } from '@/libs/hooks/useGoogleMapsApi';
import useGoogleMapsPlaceDetails from '@/libs/hooks/useGoogleMapsPlaceDetails';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });

interface BlockDetailModalContentPlaceProps extends GoogleMapsApiReturn {
  blockData: PlaceBlockDetailData;
}

export default function BlockDetailModalContentPlace({ blockData, isLoaded }: BlockDetailModalContentPlaceProps) {
  const { placeId } = blockData;
  const { place, error, loading } = useGoogleMapsPlaceDetails(placeId);
  const { coordinateList, setCoordinateList } = useCoordinateList();
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (place) {
      setCoordinateList([{ lat: place.geometry!.location!.lat(), lng: place.geometry!.location!.lng() }]);
      const placePhotos = place.photos?.slice(0, 3).map((photo) => photo.getUrl({ maxWidth: 656, maxHeight: 656 }));
      if (placePhotos) setPhotos(placePhotos);
    }
  }, [place]);

  if (!place || error) return null;
  if (!isLoaded || loading) return <div className={`bg-gray-02 ${MODAL_MAP_STYLE}`} />;
  return (
    <>
      <div className="mb-3 md:mb-4">
        <Map mapContainerStyle={MODAL_MAP_STYLE} coordinateList={coordinateList} category={blockData.category} />
      </div>
      <div className="mb-3 rounded-[0.3125rem] bg-gray-03 px-5 py-4 md:mb-4">
        <p className="font-subtitle-2 mb-3">
          주소<span className="font-caption-1 ml-3 break-words text-black-03">{place.formatted_address}</span>
        </p>
        <p className="font-subtitle-2 mb-3">
          전화<span className="font-caption-1 ml-3 text-black-03">{place.formatted_phone_number}</span>
        </p>
        <p className="font-subtitle-2">
          홈페이지<span className="font-caption-1 ml-3 break-all text-black-03">{place.website}</span>
        </p>
      </div>
      <div className="flex-row-center justify-between gap-1 md:gap-2">
        {photos.map((photo) => (
          <ImageBox
            key={photo}
            className="aspect-square w-full rounded-md"
            placeholderClassName="aspect-square w-full rounded-md bg-gray-02"
            src={photo}
            alt="placePhoto"
            width={164}
            height={164}
          />
        ))}
      </div>
    </>
  );
}
