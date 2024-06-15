'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

import React, { useState } from 'react';

interface PlaceSearchProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
}

export default function PlaceSearch({ onPlaceSelect }: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    try {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        throw new Error('Google Maps JavaScript API failed to load');
      }

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));

      const request: google.maps.places.TextSearchRequest = {
        query
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setPlaces(results);
          setError(null);
        } else {
          setPlaces([]);
          setError('No results found');
        }
      });
    } catch (error: any) {
      console.error('Error loading Google Maps API', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for places" />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {places.map((place) => (
          <button type="button" key={place.place_id} onClick={() => onPlaceSelect(place)}>
            <h3>{place.name}</h3>
            <p>{place.formatted_address}</p>
            {place.photos && place.photos[0] && (
              <img src={place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })} alt={place.name} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
