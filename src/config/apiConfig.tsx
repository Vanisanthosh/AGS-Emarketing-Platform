const ENV = import.meta.env.MODE;
export const API_BASE_URL = ENV === 'production' ? 'https://api.yourdomain.com/api/'  : 'http://localhost:8077/api/';
