import React from "react";
import PostCard from "./PostCard";

const PostsList = ({ posts, onUpdate, onDelete }) => {
  return (
    <div className="row g-3">
      {posts?.map((post) => (
        <div key={post.id} className="col-md-6">
          <PostCard post={post} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default PostsList;
