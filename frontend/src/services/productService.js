import axios from 'axios';
import { API } from '../api/endpoints';  // Importing from endpoints.js

export const getProducts = async () => {
  const response = await axios.get(API.PRODUCT.LIST_ALL);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(API.PRODUCT.CREATE, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(API.PRODUCT.UPDATE(id), product);
  return response.data;
};

export const disableProduct = async (id) => {
  const response = await axios.put(API.PRODUCT.DISABLE(id));
  return response.data;
};

export const enableProduct = async (id) => {
  const response = await axios.put(API.PRODUCT.ENABLE(id));
  return response.data;
};
