// import axios from 'axios';
// import { BASE_URL } from '../features/api/endpoints';

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // Important for sending cookies and credentials with requests
// });

// export default axiosInstance;


import axios from 'axios';
import { BASE_URL } from '../features/api/endpoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important pour les cookies
});

// Ajouter un intercepteur pour inclure le jeton dans les en-têtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ou 'sessionStorage' si vous l'utilisez
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
