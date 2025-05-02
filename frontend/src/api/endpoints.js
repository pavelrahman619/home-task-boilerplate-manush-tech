const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/v1/auth/login`,
    LOGOUT: `${BASE_URL}/api/v1/auth/logout`,
  },
  PRODUCT: {
    LIST_ALL: `${BASE_URL}/api/v1/product`, // GET
    CREATE: `${BASE_URL}/api/v1/product`,   // POST
    UPDATE: (id) => `${BASE_URL}/api/v1/product/${id}`, // PUT
    DISABLE: (id) => `${BASE_URL}/api/v1/product/disable/${id}`, // PUT
    ENABLE: (id) => `${BASE_URL}/api/v1/product/enable/${id}`,   // PUT
    LIST_ENABLED: `${BASE_URL}/api/v1/product/enabled`, // GET
  },
  PROMOTION: {
    LIST_ALL: `${BASE_URL}/api/v1/promotion`, // GET
    CREATE: `${BASE_URL}/api/v1/promotion`,   // POST
    UPDATE: (id) => `${BASE_URL}/api/v1/promotion/${id}`, // PUT
    ENABLE: (id) => `${BASE_URL}/api/v1/promotion/enable/${id}`, // PUT
    DISABLE: (id) => `${BASE_URL}/api/v1/promotion/disable/${id}`, // PUT
    LIST_ENABLED: `${BASE_URL}/api/v1/promotion/enabled`, // GET
  },
  PROMOTION_SLAB: {
    CREATE: `${BASE_URL}/api/v1/promotion-slab`, // POST
    GET_BY_PROMOTION_ID: (promotionId) => `${BASE_URL}/api/v1/promotion-slab/${promotionId}`, // GET
  },
  ORDER: {
    LIST_ALL: `${BASE_URL}/api/v1/order`, // GET
    CREATE: `${BASE_URL}/api/v1/order`,   // POST
  }
};