import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  removeTask,
  addTask,
  updateTask,
} from "../features/task/taskSlice";
import { logout } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks = [] } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // ➕ Create Task
  const handleAdd = () => {
    if (!title) return;

    dispatch(addTask({ title }));
    setTitle("");
  };

  // ✏️ Update Task
  const handleUpdate = () => {
    if (!title || !editId) return;

    dispatch(updateTask({ id: editId, data: { title } }));
    setEditId(null);
    setTitle("");
  };

  // 🔐 Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* Logout */}
      <button onClick={handleLogout}>Logout</button>

      <hr />

      {/* Create / Edit Task */}
      <h3>{editId ? "Edit Task" : "Create Task"}</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />

      {editId ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}

      <hr />

      {/* Task List */}
      <h3>Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((t) => (
          <div key={t._id} style={{ marginBottom: "10px" }}>
            <p>{t.title}</p>

            {/* Edit */}
            <button
              onClick={() => {
                setEditId(t._id);
                setTitle(t.title);
              }}
            >
              Edit
            </button>

            {/* Delete */}
            <button onClick={() => dispatch(removeTask(t._id))}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}