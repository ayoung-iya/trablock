import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import { signinProps } from '@/libs/constants/auth.type';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  signin: {
    baseUrl: 'https://be.travel-laboratory.site',
    headers: { 'Content-Type': 'application/json' }
  }
};

const fetchSignin = returnFetch(options.signin);

const serviceSignin = {
  postSignin: async (data: signinProps) => {
    const response = await fetchSignin('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('network errror');
    }
    return response;
  }
};

export default serviceSignin;
