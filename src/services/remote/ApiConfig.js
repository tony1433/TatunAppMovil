import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://192.168.0.200:3000/api/',
  headers: {
    content_type: 'aplication/json',
  },
});

export const cancelToken = axios.CancelToken.source();
