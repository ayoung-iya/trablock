'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

import React, { useState, useCallback, useEffect } from 'react';

import { GoogleMap, useJsApiLoader, Libraries, GoogleMapProps } from '@react-google-maps/api';

import GOOGLE_MAPS from '@/libs/constants/googleMaps';

export type Coordinate = {
  lat: number;
  lng: number;
};

const LIBRARIES: Libraries = ['marker'];

interface MapProps extends GoogleMapProps {
  mapContainerStyle: React.CSSProperties;
  coordinateList: Coordinate[];
}

export default function Map({ mapContainerStyle, coordinateList }: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS.API_KEY,
    mapIds: [GOOGLE_MAPS.MAP_ID],
    libraries: LIBRARIES
  });

  const handleOnLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const handleOnUnmount = useCallback(() => {
    markers.forEach((marker) => {
      // 기존 마커 제거 시 마커가 지도에 설정된 경우에만 제거
      if (marker.map) {
        marker.map = null;
      }
    });
    // 기존 폴리라인 제거 시 폴리라인이 지도에 설정된 경우에만 제거
    if (polyline && polyline.getMap()) {
      polyline.setMap(null);
    }
    setMap(null);
  }, [markers, polyline]);

  const createMarkerElement = (number: number) => {
    const markerDiv = document.createElement('div');
    markerDiv.style.backgroundColor = 'blue';
    markerDiv.style.width = '32px';
    markerDiv.style.height = '32px';
    markerDiv.style.borderRadius = '50%';
    markerDiv.style.color = 'white';
    markerDiv.style.display = 'flex';
    markerDiv.style.alignItems = 'center';
    markerDiv.style.justifyContent = 'center';
    markerDiv.style.fontSize = '16px';
    markerDiv.textContent = number.toString();
    markerDiv.style.transform = 'translateY(50%)';
    return markerDiv;
  };

  useEffect(() => {
    if (map) {
      map.panTo(coordinateList[0]);

      // 기존 마커 제거 시 마커가 지도에 설정된 경우에만 제거
      markers.forEach((marker) => {
        if (marker.map) {
          marker.map = null;
        }
      });
      setMarkers([]);

      // 새 마커 생성
      const newMarkers = coordinateList.map((coord, index) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: coord,
          map,
          content: createMarkerElement(index + 1)
        });
        return marker;
      });
      setMarkers(newMarkers);

      // 기존 폴리라인 제거 시 폴리라인이 지도에 설정된 경우에만 제거
      if (polyline && polyline.getMap()) {
        polyline.setMap(null);
      }

      // 새 폴리라인 생성
      const newPolyline = new google.maps.Polyline({
        path: coordinateList,
        map,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      setPolyline(newPolyline);
    }
  }, [map, coordinateList]);

  if (!isLoaded) return <div>Loading...</div>;

  // center가 첫 요소로 설정되어있음. 이거 바꾸는건 나중에 하자.
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={coordinateList[0]}
      zoom={6}
      onLoad={handleOnLoad}
      onUnmount={handleOnUnmount}
      options={{ mapId: GOOGLE_MAPS.MAP_ID }}
    />
  );
}
