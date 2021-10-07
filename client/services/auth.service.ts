import axios from 'axios';
import qs from 'qs';

const API_URL = 'http://localhost:8080/api/auth';

export const login = (data: any) => {
  return axios(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
  })
  .then((response: any) => {
    console.log(response);
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const register = async (data: any) => {
  return await axios(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
  })
  .then((response: any) => {
    return response.data;
  });
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};
