/* eslint-disable no-undef */
/* eslint-disable no-shadow */

'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';

import useCoordinateList from '@/libs/hooks/useCoordinateList';
import useGoogleMapsApi from '@/libs/hooks/useGoogleMapsApi';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });
const PlaceSearch = dynamic(() => import('@/components/map/PlaceSearch'), { ssr: false });
const PlaceDetails = dynamic(() => import('@/components/map/PlaceDetail'), { ssr: false });

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

function Page() {
  const { isLoaded, loadError } = useGoogleMapsApi();

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [secondPlace, setSecondPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const { coordinateList, setCoordinateList } = useCoordinateList();

  const handlePlaceSelect = (place: google.maps.places.PlaceResult, isFirst: boolean) => {
    if (isFirst) {
      setPlace(place);
      setSecondPlace(null);
      setCoordinateList([{ lat: place.geometry!.location!.lat(), lng: place.geometry!.location!.lng() }]);
    } else {
      setSecondPlace(place);
      setCoordinateList([
        { lat: place!.geometry!.location!.lat(), lng: place!.geometry!.location!.lng() },
        { lat: place.geometry!.location!.lat(), lng: place.geometry!.location!.lng() }
      ]);
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Google Map Example</h1>
      <div>
        <h2>Search First Place</h2>
        <PlaceSearch onPlaceSelect={(place) => handlePlaceSelect(place, true)} />
      </div>
      {place && (
        <>
          <h2>First Place Details</h2>
          <PlaceDetails placeId={place.place_id!} />
        </>
      )}
      {place && (
        <div>
          <h2>Search Second Place</h2>
          <PlaceSearch onPlaceSelect={(place) => handlePlaceSelect(place, false)} />
        </div>
      )}
      {secondPlace && (
        <>
          <h2>Second Place Details</h2>
          <PlaceDetails placeId={secondPlace.place_id!} />
        </>
      )}
      <Map mapContainerStyle={mapContainerStyle} coordinateList={coordinateList} />
    </div>
  );
}

export default Page;
