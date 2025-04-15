import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getPosts = () => api.get('/posts');
export const createPost = (postData) => api.post('/posts', postData);