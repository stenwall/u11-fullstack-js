import http from 'helpers/http-common';
import useSWR, { mutate } from 'swr';
import User from 'types/user.type';

const key = '/auth/user';
const fetcher = (url: string) => http.get(url).then((res) => res.data);

if (typeof window !== 'undefined') {
  const data = localStorage.getItem(key);
  if (data) mutate(key, JSON.parse(data), false);
}

export function useUser() {
  return useSWR<User>(key, fetcher, {
    onError() {
      localStorage.removeItem(key);
    },
    onSuccess(user) {
      localStorage.setItem(key, JSON.stringify(user));
    },
  });
}
