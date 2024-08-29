import { notFound } from 'next/navigation';
import returnFetch, { FetchArgs, ReturnFetch, ReturnFetchDefaultOptions } from 'return-fetch';

import API_URL from '@/apis/constants/url';
import type { CustomError } from '@/apis/interceptors/customError.type';
import getAuthToken from '@/apis/utils/getAuthToken';
import { CamelCase, changeKeysToCamelCase } from '@/libs/utils/snakeToCamel';

type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, 'body'> & { body?: object };
interface ApiResponse<T> {
  data: T;
  error?: CustomError;
}

const defaultApiOptions = {
  baseUrl: API_URL.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

const returnFetchThrowingErrorByStatusCode: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response) => {
        if (response.status >= 400) {
          const { error } = (await response.json()) as { error: CustomError };

          throw error;
        }

        return response;
      }
    }
  });

const returnFetchHandleNotFound: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response) => {
        if (response.status === 404) {
          notFound();
        }

        return response;
      }
    }
  });

const returnFetchAddAuthTokenInHeader: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      request: async (request) => {
        const [url, options] = request;
        const token = getAuthToken();

        if (!token) {
          return request;
        }

        const updatedOptions = {
          ...options,
          headers: {
            ...options?.headers,
            'authorization-token': token
          }
        };

        return [url, updatedOptions];
      }
    }
  });

const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== 'SyntaxError') {
      throw e;
    }

    return text.trim();
  }
};

const returnFetchJson = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async <T>(url: FetchArgs[0], init?: JsonRequestInit): Promise<CamelCase<T>> => {
    const response = await fetch(url, {
      ...init,
      body: init?.body && JSON.stringify(init.body)
    });

    const { data: rawData, error } = parseJsonSafely(await response.text()) as ApiResponse<T>;
    const data = changeKeysToCamelCase(rawData);

    if (error) {
      throw error;
    }

    if (Array.isArray(data)) {
      return { data } as CamelCase<T>;
    }

    return data;
  };
};

export const fetchExtended = returnFetchJson({
  fetch: returnFetchThrowingErrorByStatusCode({
    fetch: returnFetchHandleNotFound(defaultApiOptions)
  })
});

export const fetchExtendedWithAuthToken = returnFetchJson({
  fetch: returnFetchThrowingErrorByStatusCode({
    fetch: returnFetchAddAuthTokenInHeader({
      fetch: returnFetchHandleNotFound(defaultApiOptions)
    })
  })
});
