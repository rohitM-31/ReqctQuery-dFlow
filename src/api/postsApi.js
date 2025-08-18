import axios from "axios";

const API_URL = "http://localhost:4000/posts";

export const fetchPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addPost = async (post) => {
  const res = await axios.post(API_URL, post);
  return res.data;
};

export const updatePost = async (post) => {
  const res = await axios.put(`${API_URL}/${post.id}`, post);
  return res.data;
};

export const deletePost = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
