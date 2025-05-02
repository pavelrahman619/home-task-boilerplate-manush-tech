import axios from 'axios';
import { API } from '../api/endpoints';

export const getOrders = async () => {
  const response = await axios.get(API.ORDER.LIST_ALL);
  return response.data;
};

export const createOrder = async (order) => {
  const response = await axios.post(API.ORDER.CREATE, order);
  return response.data;
};