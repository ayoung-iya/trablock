import axios from 'axios';

import getAuthToken from '@/apis/utils/getAuthToken';

const API_BASE_URL = 'https://be.travel-laboratory.site/api/v1';

const token = getAuthToken();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'authorization-token': token
  }
});

export const comment = async (data) => {
  try {
    const response = await api.post(`/comment`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const replyComment = async (data, id) => {
  try {
    const response = await api.patch(`/comments/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComments = async (id) => {
  try {
    const response = await api.get(`/reviews/${id}/comments`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likeComment = async (id) => {
  try {
    const response = await api.put(`/comments/${id}/likes`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
