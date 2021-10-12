import http from 'helpers/http-common';
import qs from 'qs';
import User from 'types/user.type';

export const login = (data: User) => {
  return http.post('/auth/login', qs.stringify(data))
  .then((res: any) => {
    return res;
  });
};

export const logout = () => {
  return http.post('/auth/logout')
  .then((res: any) => {
    return res;
  });
};

export const register = async (data: User) => {
  return http.post('/auth/register', qs.stringify(data))
  .then((res: any) => {
    return res;
  });
};
