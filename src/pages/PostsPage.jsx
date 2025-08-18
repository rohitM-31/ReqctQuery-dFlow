import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, addPost, updatePost, deletePost } from "../api/postsApi";
import PostForm from "../components/PostsForm";
import PostsList from "../components/PostList";

const PostsPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { mutate: addMute } = useMutation(addPost, {
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (oldData) =>
        oldData ? [...oldData, newPost] : [newPost]
      );
    },
  });

  const { mutate: updateMute } = useMutation(updatePost, {
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldData) =>
        oldData.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    },
  });

  const { mutate: deleteMute } = useMutation(deletePost, {
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["posts"], (oldData) =>
        oldData.filter((post) => post.id !== deletedId)
      );
    },
  });

  if (isLoading) return <div className="alert alert-info">Loading posts...</div>;
  if (isError) return <div className="alert alert-danger">{error.message}</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Posts CRUD App</h2>

      <PostForm onAdd={addMute} />

      <PostsList posts={data} onUpdate={updateMute} onDelete={deleteMute} />

      <div className="text-center mt-4">
        <button className="btn btn-outline-primary" onClick={() => refetch()}>
          Fetch
        </button>
      </div>
    </div>
  );
};

export default PostsPage;
