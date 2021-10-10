import axios from 'axios';
import http from 'helpers/http-common';
import qs from 'qs';
import type Post from 'types/post.type';

// create new post
export const createPost = (data: Post) => {
  return http(`/posts`, {
    method: 'POST',
    data: qs.stringify(data),
  })
  .then((response: any) => {
    console.log(response.headers);
    console.log(response);
    return response.data;
  });
}

// get all posts with users
export const getPosts = () => {
  return http.get('/posts')
  .then((response: any) => {
    return response.data;
  });
}
