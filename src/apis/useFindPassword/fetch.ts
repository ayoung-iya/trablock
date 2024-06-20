import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const options: {
  [key: string]: ReturnFetchDefaultOptions;
} = {
  postFindPassword: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  }
};

const fetchFindPassword = returnFetch(options.postFindPassword);

const serviceFindPassword = {
  postEmail: async (username: string) => {
    const response = await fetchFindPassword('/api/v1/auth/pw-inquiry/email', {
      method: 'POST',
      body: JSON.stringify({ username })
    });
    if (!response.ok) {
      throw new Error('network Error');
    }
    return response;
  },
  postVerification: async (data: { username: string; pw_question_id: number; answer: string }) => {
    const response = await fetchFindPassword('/api/v1/auth/pw-inquiry/verification', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('network Error');
    }
    return response;
  },
  postRenewal: async (data: { username: string; password: string; pw_question_id: number; answer: string }) => {
    const response = await fetchFindPassword('/api/v1/auth/pw-inquiry/renewal', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('network Error');
    }
    return response;
  }
};

export default serviceFindPassword;
