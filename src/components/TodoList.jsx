import React, { useState } from "react";
import { fetchData, addToApi, updateApi, deleteApi } from "../api/crudApi";


const TodoList = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(""), 2000);
  };

  const handleFetch = async () => {
    const data = await fetchData();
    setItems(data);
    showAlert("Items loaded successfully!");
  };

  const handleCreate = async () => {
    if (!title.trim() || !body.trim()) return;
    const newItem = await addToApi(title, body);
    setItems((prev) => [newItem, ...prev]);
    setTitle("");
    setBody("");
    showAlert("Item added successfully!");
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditBody(item.body);
  };

  const handleUpdate = async (id) => {
    const updatedItem = await updateApi(id, editTitle, editBody);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, title: updatedItem.title, body: updatedItem.body }
          : item
      )
    );
    setEditId(null);
    showAlert("Item updated successfully!");
  };

  const handleDelete = async (id) => {
    await deleteApi(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    showAlert("Item deleted successfully!");
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
        <div className="container">
         
          <div className="row mb-4">
            <div className="col-12">
              <div className="text-center">
                <h1 className="display-4 text-primary mb-2">
                  <i className="bi bi-check2-square me-2"></i>
                  TodoList Application
                </h1>
                <p className="lead text-muted">Manage your tasks efficiently</p>
              </div>
            </div>
          </div>

          {alert && (
            <div className="row mb-3">
              <div className="col-12">
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                  <strong>
                    {alert.type === 'success' && ''}
                    {alert.type === 'danger' && ' '}
                    {alert.type === 'warning' && ' '}
                  </strong>
                  {alert.message}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setAlert("")}
                  ></button>
                </div>
              </div>
            </div>
          )}

          <div className="row mb-4">
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Task
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Title</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter task title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Description</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter task description..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <div className="d-flex gap-2 justify-content-end">
                        <button 
                          className="btn btn-success btn-lg px-4" 
                          onClick={handleCreate}
                          disabled={!title.trim() || !body.trim()}
                        >
                          <i className="bi bi-plus-lg me-2"></i>
                          Add Task
                        </button>
                        <button 
                          className="btn btn-outline-primary btn-lg px-4" 
                          onClick={handleFetch}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Loading...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-arrow-clockwise me-2"></i>
                              Load Items
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-secondary mb-0">
                  Your Tasks 
                  <span className="badge bg-primary ms-2">{items.length}</span>
                </h3>
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="row">
              <div className="col-12">
                <div className="text-center py-5">
                  <div className="mb-3">
                    <i className="bi bi-inbox display-1 text-muted"></i>
                  </div>
                  <h4 className="text-muted">No tasks yet</h4>
                  <p className="text-muted">Click "Load Items" to fetch sample tasks or add a new one!</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {items.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6">
                  <div className="card h-100 shadow-sm border-0 hover-shadow">
                    <div className="card-body d-flex flex-column">
                      {editId === item.id ? (
                        <>
                          <div className="mb-3">
                            <label className="form-label fw-semibold text-primary">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-semibold text-primary">Description</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              value={editBody}
                              onChange={(e) => setEditBody(e.target.value)}
                            />
                          </div>
                          <div className="d-flex gap-2 mt-auto">
                            <button
                              className="btn btn-success flex-fill"
                              onClick={() => handleUpdate(item.id)}
                              disabled={!editTitle.trim() || !editBody.trim()}
                            >
                              <i className="bi bi-check-lg me-1"></i>
                              Save
                            </button>
                            <button
                              className="btn btn-outline-secondary flex-fill"
                              onClick={() => setEditId(null)}
                            >
                              <i className="bi bi-x-lg me-1"></i>
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mb-3">
                            <h5 className="card-title text-primary mb-2">
                              <i className="bi bi-check-circle me-2"></i>
                              {item.title}
                            </h5>
                            <p className="card-text text-muted flex-grow-1">
                              {item.body}
                            </p>
                          </div>
                          <div className="d-flex gap-2 mt-auto">
                            <button
                              className="btn btn-outline-warning flex-fill"
                              onClick={() => startEdit(item)}
                            >
                              <i className="bi bi-pencil me-1"></i>
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger flex-fill"
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="bi bi-trash me-1"></i>
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

  );
};

export default TodoList;
