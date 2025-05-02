import axios from 'axios';
import { API } from '../api/endpoints';  // Importing from endpoints.js

// Get all promotions
export const getPromotions = async () => {
  const response = await axios.get(API.PROMOTION.LIST_ALL);
  return response.data;
};

export const getEnabledPromotions = async () => {
  const response = await axios.get(API.PROMOTION.LIST_ENABLED);
  return response.data;
};

// Create a new promotion
export const createPromotion = async (promotion) => {
  const response = await axios.post(API.PROMOTION.CREATE, promotion);
  return response.data;
};

// Update an existing promotion
export const updatePromotion = async (id, promotion) => {
  const response = await axios.put(API.PROMOTION.UPDATE(id), promotion);
  return response.data;
};

// Disable a promotion
export const disablePromotion = async (id) => {
  const response = await axios.put(API.PROMOTION.DISABLE(id));
  return response.data;
};

// Enable a promotion
export const enablePromotion = async (id) => {
  const response = await axios.put(API.PROMOTION.ENABLE(id));
  return response.data;
};
