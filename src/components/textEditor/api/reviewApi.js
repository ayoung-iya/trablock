import axios from 'axios';

const API_BASE_URL = 'https://be.travel-laboratory.site/api/v1';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE3LCJleHAiOjE3MTkxMjg4NDN9.BGIEYrCtqw75AySp9koA6Nde6VFZmBexBELXoWsp7yc';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'authorization-token': token
  }
});

export const logIn = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createArticle = async (data) => {
  try {
    const response = await api.post('register/article', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await api.patch(`/reviews/${id}/status`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likeReview = async (id) => {
  try {
    const response = await api.patch(`/reviews/${id}/status`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const poseReview = async (data) => {
  try {
    const response = await api.post('/review', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReview = async (id) => {
  try {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
