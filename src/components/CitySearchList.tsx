import React, { useEffect, useState, forwardRef } from 'react';

import { CityInfo } from '@/apis/useArticle/article.type';

interface CitySearchListProps {
  searchString: string;
  selectedCityList?: { placeId: string; address: string; city: string }[];
  onClickCity: (value: CityInfo[]) => void;
}

const extractCountryFromAddress = (address: string, city: string) => {
  const onlyEnglish = /^[A-Za-z]+$/;
  const splitAddress = address.split(' ');

  if (onlyEnglish.test(city)) {
    return splitAddress[splitAddress.length - 1];
  }

  return splitAddress[0];
};

const isSelectedCity = (selectedCityIdList: string[], cityId: string) => {
  return selectedCityIdList.includes(cityId);
};

const CitySearchList = forwardRef(function CitySearchList(
  { searchString, selectedCityList, onClickCity }: CitySearchListProps,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCityIdList = selectedCityList?.map(({ placeId }) => placeId) || [];

  const handleCityClick: (city: CityInfo) => React.MouseEventHandler<HTMLButtonElement> = (city: CityInfo) => () => {
    const cityList = selectedCityList || [];

    if (isSelectedCity(selectedCityIdList, city.placeId)) {
      onClickCity(cityList.filter(({ placeId }) => placeId !== city.placeId));
      return;
    }

    onClickCity([...cityList, city]);
  };

  useEffect(() => {
    const fetchGooglePlaces = async () => {
      if (!searchString.length) return;

      try {
        setIsLoading(true);

        if (searchList.length) {
          setIsLoading(false);
        }

        const response = await fetch('/api/googlePlaces', {
          method: 'POST',
          body: JSON.stringify({
            input: searchString,
            includedPrimaryTypes: ['(cities)'],
            includeQueryPredictions: true
          })
        });

        const data = await response.json();

        setSearchList(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGooglePlaces();
  }, [searchString, searchList.length]);

  if (isLoading) {
    return (
      <ul
        className="absolute top-1 h-16 w-full rounded-[0.625rem] bg-white-01 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
        ref={ref}
      >
        <p className="flex size-full items-center justify-center text-center text-base font-medium leading-5">
          로딩중..
        </p>
      </ul>
    );
  }

  if (!searchList.length) {
    return (
      <ul
        className="absolute top-1 h-16 w-full rounded-[0.625rem] bg-white-01 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
        ref={ref}
      >
        <p className="flex size-full items-center justify-center text-center text-base font-medium leading-5">
          일치하는 결과가 없습니다
        </p>
      </ul>
    );
  }

  return (
    <ul
      // eslint-disable-next-line max-len
      className="absolute top-1 max-h-[15.75rem] w-full overflow-y-auto rounded-[0.625rem] bg-white-01 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] md:max-h-[11.8125rem]"
      ref={ref}
    >
      {searchList?.map(({ placeId, address, city }) => (
        <li
          key={placeId}
          className={`${isSelectedCity(selectedCityIdList, placeId) ? 'bg-gray-03' : ''} hover:bg-gray-03`}
        >
          <button
            type="button"
            className="flex size-full flex-col gap-1 px-4 py-3"
            onClick={handleCityClick({ placeId, address, city })}
          >
            <span className="font-gray-01 text-xs leading-[125%]">{extractCountryFromAddress(address, city)}</span>
            <span className="text-base font-medium leading-5">{city}</span>
          </button>
        </li>
      ))}
    </ul>
  );
});

export default CitySearchList;
