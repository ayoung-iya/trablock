import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { errorInterceptor, requestInterceptor, successInterceptor } from '@/apis/interceptors';

// base url O
const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: ``, // API BASE URL 추가 -> .env.local
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};

// base url X
const axiosRequestNoBaseUrlConfig: AxiosRequestConfig = {
  baseURL: ``,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};

// base url X, file upload
const axiosFileRequestConfig: AxiosRequestConfig = {
  baseURL: ``,
  responseType: 'json',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: false
};

const apiRequestor: AxiosInstance = axios.create(axiosRequestConfig); // Token 필요 X, Base Url O
const apiRequestorNoBaseUrl: AxiosInstance = axios.create(axiosRequestNoBaseUrlConfig); // Token 필요 X, Base Url X
const apiFileRequestor: AxiosInstance = axios.create(axiosFileRequestConfig); // Token 필요 X, Base Url X, File 업로드
const apiRequestorToken: AxiosInstance = axios.create(axiosRequestConfig); // Token 필요 O, Base Url O

// requset interceptor
apiRequestorToken.interceptors.request.use(requestInterceptor);

// response interceptor
apiRequestor.interceptors.response.use(successInterceptor, errorInterceptor);
apiFileRequestor.interceptors.response.use(successInterceptor, errorInterceptor);
apiRequestorToken.interceptors.response.use(successInterceptor, errorInterceptor);

export { apiRequestor, apiRequestorNoBaseUrl, apiFileRequestor, apiRequestorToken };
