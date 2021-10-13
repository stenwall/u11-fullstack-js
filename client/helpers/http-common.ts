import axios from 'axios';

// new axios instance with defaults
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true
});

