import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

// import { signinProps } from '@/components/SigninForm';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  signin: {
    baseUrl: 'https://be.travel-laboratory.site',
    headers: { 'Content-Type': 'application/json' }
  }
};

const fetchSignin = returnFetch(options.signin);

const serviceSignin = {
  postSignin: async (data: { username: string; password: string }) => {
    const response = await fetchSignin('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = response.json();
    return result;
  }
};

export default serviceSignin;
