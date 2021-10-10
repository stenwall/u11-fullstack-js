import http from 'helpers/http-common';
import qs from 'qs';

export const login = (data: any) => {
  return http.post('/auth/login', qs.stringify(data))
  .then((res: any) => {
    if (res.data.user) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res;
  });
};

export const logout = () => {
  localStorage.removeItem('user');
  return http.post('/auth/logout')
  .then((res: any) => {
    return res;
  });
};

export const register = async (data: any) => {
  return http.post('/auth/register', qs.stringify(data))
  .then((res: any) => {
    return res;
  });
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};
