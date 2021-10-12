import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// new axios instance with defaults
export default axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true
});

