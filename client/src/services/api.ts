import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/';
// export const BASE_URL = 'https://docs-noahgothacked-server.herokuapp.com/';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default API;
