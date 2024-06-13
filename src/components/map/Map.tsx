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

import GOOGLE_MAPS from '@/libs/constants/googleMaps';

export type Coordinate = {
  lat: number;
  lng: number;
};

interface MapProps extends GoogleMapProps {
  mapContainerStyle: React.CSSProperties;
  coordinateList: Coordinate[];
}

export default function Map({ mapContainerStyle, coordinateList }: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  const handleOnLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

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

      markers.forEach((marker) => {
        if (marker.map) {
          marker.map = null;
        }
      });
      setMarkers([]);

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

      if (polyline && polyline.getMap()) {
        polyline.setMap(null);
      }

      const newPolyline = new google.maps.Polyline({
        path: coordinateList,
        map,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      setPolyline(newPolyline);

      map.fitBounds(bounds);
    }
  }, [map, coordinateList]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={coordinateList.length > 0 ? coordinateList[0] : { lat: 0, lng: 0 }}
      zoom={13}
      onLoad={handleOnLoad}
      onUnmount={handleOnUnmount}
      options={{ mapId: GOOGLE_MAPS.MAP_ID }}
    />
  );
}
