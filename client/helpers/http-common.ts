import axios from 'axios';

// just for now...
const API_URL = 'http://localhost:8080/api';

// new axios instance with defaults
export default axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true
});

