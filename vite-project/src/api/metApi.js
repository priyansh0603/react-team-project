import axios from 'axios';

const metApi = axios.create({
  // Use Vite proxy in development to avoid browser CORS issues.
  baseURL: '/met-api/',
  timeout: 10000,
});

export default metApi;
