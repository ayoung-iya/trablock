'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

import React, { useState, useEffect } from 'react';

interface PlaceDetailsProps {
  placeId: string;
}

export default function PlaceDetail({ placeId }: PlaceDetailsProps) {
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    const fetchPlaceDetails = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error('Google Maps JavaScript API failed to load');
        return;
      }

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));

      const request = {
        placeId,
        fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'photos']
      };

      service.getDetails(request, (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && result) {
          setPlace(result);
        } else {
          setPlace(null);
        }
      });
    };

    fetchPlaceDetails();
  }, [placeId]);

  if (!place) return <div>Loading...</div>;

  return (
    <div>
      <h2>{place.name}</h2>
      <p>{place.formatted_address}</p>
      <p>{place.formatted_phone_number}</p>
      <a href={place.website} target="_blank" rel="noopener noreferrer">
        {place.website}
      </a>
      {place.photos &&
        place.photos
          .slice(0, 3)
          .map((photo) => (
            <img key={photo.getUrl()} src={photo.getUrl({ maxWidth: 200, maxHeight: 200 })} alt={`${place.name}`} />
          ))}
    </div>
  );
}
