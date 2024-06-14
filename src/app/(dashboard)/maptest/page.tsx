'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';

import { Coordinate } from '@/components/map/type';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCoordinateList: Coordinate[] = [
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  { lat: 40.7128, lng: -74.006 } // New York
];

const firstCoordinateList: Coordinate[] = [
  { lat: 34.0522, lng: -118.2437 } // Los Angeles
];

const secondCoordinateList: Coordinate[] = [
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 40.7128, lng: -74.006 } // New York
];

function Page() {
  const [coordinateList, setCoordinateList] = useState(defaultCoordinateList);

  const handleFirstClick = () => {
    setCoordinateList(firstCoordinateList);
  };

  const handleSecondClick = () => {
    setCoordinateList(secondCoordinateList);
  };

  return (
    <div>
      <h1>Google Map Example</h1>
      <Map mapContainerStyle={mapContainerStyle} coordinateList={coordinateList} />
      <button type="button" onClick={handleFirstClick}>
        First
      </button>
      <button type="button" onClick={handleSecondClick}>
        Second
      </button>
    </div>
  );
}

export default Page;
