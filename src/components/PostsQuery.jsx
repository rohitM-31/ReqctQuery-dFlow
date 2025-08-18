import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:4000/posts";

const PostsQuery = () => {
  const [nam1, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editHobby, setEditHobby] = useState("");

  const queryClient = useQueryClient();

  const fetchPosts = async () => {
    const res = await axios.get(API_URL);
    return res.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Add post
  const addPosts = async (post) => {
    const res = await axios.post(API_URL, post);
    return res.data;
  };
  const { mutate: addMute } = useMutation({
    mutationFn: addPosts,
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (oldData) =>
        oldData ? [...oldData, newPost] : [newPost]
      );
      setName("");
      setHobby("");
    },
  });

  // Delete post
  const deletePost = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  };
  const { mutate: deleteMute } = useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["posts"], (oldData) =>
        oldData.filter((post) => post.id !== deletedId)
      );
    },
  });

  // Update post
  const updatePost = async (post) => {
    const res = await axios.put(`${API_URL}/${post.id}`, post);
    return res.data;
  };
  const { mutate: updateMute } = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldData) =>
        oldData.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      setEditId(null);
      setEditName("");
      setEditHobby("");
    },
  });

  if (isLoading) return <div className="alert alert-info">Loading posts...</div>;
  if (isError) return <div className="alert alert-danger">{error.message}</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nam1.trim() || !hobby.trim()) return;
    addMute({ nam1, hobby });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Posts CRUD App</h2>

      {/* Add Post Form */}
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={nam1}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter hobby"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-primary">
            Add Post
          </button>
        </div>
      </form>

      {/* Posts List */}
      <ul className="list-group mb-3">
        {data?.map((post) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editId === post.id ? (
              <div className="row g-2 w-100">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={editHobby}
                    onChange={(e) => setEditHobby(e.target.value)}
                  />
                </div>
                <div className="col-md-4 d-flex">
                  <button
                    className="btn btn-success me-2"
                    onClick={() =>
                      updateMute({ id: post.id, nam1: editName, hobby: editHobby })
                    }
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span>
                  {post.nam1} — {post.hobby}
                </span>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditId(post.id);
                      setEditName(post.nam1);
                      setEditHobby(post.hobby);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteMute(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={() => refetch()}>
          Fetch
        </button>
      </div>
    </div>
  );
};

export default PostsQuery;
