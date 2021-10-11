import http from 'helpers/http-common';
import qs from 'qs';
import type Post from 'types/post.type';

// create new post
export const createPost = (data: Post) => {
  return http.post(`/posts`, qs.stringify(data))
  .then((res: any) => {
    return res;
  });
}

