import React, { useState } from "react";

const PostCard = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(post.nam1);
  const [editHobby, setEditHobby] = useState(post.hobby);

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        {isEditing ? (
          <div className="w-100">
            <div className="mb-2">
              <input
                type="text"
                className="form-control mb-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={editHobby}
                onChange={(e) => setEditHobby(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => {
                  onUpdate({ id: post.id, nam1: editName, hobby: editHobby });
                  setIsEditing(false);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h5 className="card-title mb-1">{post.nam1}</h5>
              <p className="card-text">{post.hobby}</p>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-warning btn-sm mb-2"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
