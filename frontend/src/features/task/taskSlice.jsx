import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./taskAPI";

// 📥 Fetch Tasks
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await api.getTasks();
  return res.data;
});

// ➕ Add Task
export const addTask = createAsyncThunk("tasks/add", async (data) => {
  const res = await api.createTask(data);
  return res.data;
});

// ❌ Delete Task
export const removeTask = createAsyncThunk("tasks/delete", async (id) => {
  await api.deleteTask(id);
  return id;
});

// ✏️ Update Task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }) => {
    const res = await api.updateTask(id, data);
    return res.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [] },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })

      // Add
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // Delete
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (t) => t._id !== action.payload
        );
      })

      // Update
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      });
  },
});

export default taskSlice.reducer;