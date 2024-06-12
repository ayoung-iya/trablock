import returnFetch, { ReturnFetch } from 'return-fetch';

const interceptor: { [key: string]: ReturnFetch } = {
  logging: (args) =>
    returnFetch({
      ...args,
      interceptors: {
        request: async (request) => {
          console.log('▷▷▷ Request', request);
          return request;
        },
        response: async (response) => {
          console.log('▶▶▶ Response', response);
          return response;
        }
      }
    })
};

export default interceptor;
