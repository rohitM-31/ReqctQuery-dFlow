import React, { useState } from "react";

const PostsForm = ({ onAdd }) => {
  const [nam1, setName] = useState("");
  const [hobby, setHobby] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nam1.trim() || !hobby.trim()) return;
    onAdd({ nam1, hobby });
    setName("");
    setHobby("");
  };

  return (
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
  );
};

export default PostsForm;
