import axios from 'axios';
import { BASE_URL } from '../features/api/endpoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for sending cookies and credentials with requests
});

export default axiosInstance;
