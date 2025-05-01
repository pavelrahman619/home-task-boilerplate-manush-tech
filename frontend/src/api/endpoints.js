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
};