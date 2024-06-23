import axios from 'axios';

const API_BASE_URL = 'https://be.travel-laboratory.site/api/v1';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE3LCJleHAiOjE3MTkxMjg2NTl9.hCv-P6tT-l-gCu1FIApDJbU3ZZLeqoCinlEfNs4F7Po';

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
