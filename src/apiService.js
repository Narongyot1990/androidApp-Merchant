// src/apiService.js
import axios from 'axios';

const API_URL = 'https://backend-iota-roan-15.vercel.app';


export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
