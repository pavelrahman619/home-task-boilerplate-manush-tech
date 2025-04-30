// src/services/productService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/product`;

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

export const disableProduct = async (id) => {
  const response = await axios.put(`${API_URL}/disable/${id}`);
  return response.data;
};

export const enableProduct = async (id) => {
  const response = await axios.put(`${API_URL}/enable/${id}`);
  return response.data;
};
