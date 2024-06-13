/* eslint-disable consistent-return */

'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

import React, { useState, useCallback, useEffect } from 'react';

import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';

import { Coordinate } from '@/components/map/type';
import { GOOGLE_MAPS, MAX_ZOOM } from '@/libs/constants/googleMaps';

interface MapProps extends GoogleMapProps {
  mapContainerStyle: React.CSSProperties;
  coordinateList: Coordinate[];
}

export default function Map({ mapContainerStyle, coordinateList }: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  // 맵 load
  const handleOnLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // 맵 unmount
  const handleOnUnmount = useCallback(() => {
    markers.forEach((marker) => {
      if (marker.map) {
        marker.map = null;
      }
    });
    if (polyline && polyline.getMap()) {
      polyline.setMap(null);
    }
    setMap(null);
  }, [markers, polyline]);

  // 커스텀 마커 스타일
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
    if (map && coordinateList.length > 0 && coordinateList[0]) {
      const bounds = new window.google.maps.LatLngBounds();

      // 기존 마커 초기화
      markers.forEach((marker) => {
        if (marker.map) {
          marker.map = null;
        }
      });
      setMarkers([]);

      // 새로운 마커 추가
      const newMarkers = coordinateList.map((coord, index) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: coord,
          map,
          content: createMarkerElement(index + 1)
        });
        bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
        return marker;
      });
      setMarkers(newMarkers);

      // 기존 폴리라인 초기화
      if (polyline && polyline.getMap()) {
        polyline.setMap(null);
      }

      // 새로운 폴리라인 추가
      const newPolyline = new google.maps.Polyline({
        path: coordinateList,
        map,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      setPolyline(newPolyline);

      // 마커 거리에 맞춰 줌 레벨 제어
      map.fitBounds(bounds);

      // idle 이벤트 리스너를 추가하여 맵 최대 줌 레벨 제어
      const listener = window.google.maps.event.addListenerOnce(map, 'idle', () => {
        const currentZoom = map.getZoom() || 0;
        if (currentZoom > MAX_ZOOM) {
          map.setZoom(MAX_ZOOM);
        }
      });

      return () => window.google.maps.event.removeListener(listener);
    }
  }, [map, coordinateList]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={coordinateList.length > 0 ? coordinateList[0] : { lat: 0, lng: 0 }}
      zoom={MAX_ZOOM}
      onLoad={handleOnLoad}
      onUnmount={handleOnUnmount}
      options={{ mapId: GOOGLE_MAPS.MAP_ID }}
    />
  );
}
