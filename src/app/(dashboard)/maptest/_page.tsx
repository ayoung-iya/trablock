'use client';

import React, { useState } from 'react';

import { APIProvider, Map, AdvancedMarker, Pin, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

import API_URL from '@/apis/constants/url';

type Location = {
  position: { lat: number; lng: number };
  title: string;
};

const locationList: Location[] = [
  { position: { lat: 37.7749, lng: -122.4194 }, title: 'San Francisco' },
  { position: { lat: 34.0522, lng: -118.2437 }, title: 'Los Angeles' },
  { position: { lat: 36.1699, lng: -115.1398 }, title: 'Las Vegas' },
  { position: { lat: 40.7128, lng: -74.006 }, title: 'New York' }
];

function Page() {
  const [center, setCenter] = useState(0);
  const [currentCenter, setCurrentCenter] = useState(locationList[0].position);

  // locations의 position에 대해 center 순환
  const handleClick = () => {
    const nextCenter = (center + 1) % locationList.length;
    console.log('nextCenter', nextCenter);
    setCenter(nextCenter);
    setCurrentCenter(locationList[nextCenter].position);
  };

  return (
    <>
      <APIProvider apiKey={API_URL.GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
          className="size-96"
          mapId="testmap"
          defaultZoom={6} // Default zoom level if locations are not available
          defaultCenter={locationList[0].position} // Default center (geographic center of the contiguous United States)
          center={currentCenter}
          onCenterChanged={(ev: MapCameraChangedEvent) => console.log('center changed:', ev.detail.center)}
          onCameraChanged={(ev: MapCameraChangedEvent) => setCurrentCenter(ev.detail.center)}
        >
          {locationList.map((location) => (
            <AdvancedMarker key={location.title} {...location}>
              <Pin background="#0f9d58" borderColor="#006425" glyphColor="#60d98f" />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
      <button type="button" onClick={handleClick}>
        다음 마커
      </button>
    </>
  );
}

export default Page;
