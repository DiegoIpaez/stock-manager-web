import axios from 'axios';
import { CONFIG } from '@/constants';

const defaultOptions = {
  baseURL: CONFIG.BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

const clientAxios = axios.create(defaultOptions);

export default clientAxios;
