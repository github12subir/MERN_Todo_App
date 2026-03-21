import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./taskAPI";

// 📥 Fetch Tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getTasks();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  }
);

// ➕ Add Task
export const addTask = createAsyncThunk(
  "tasks/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.createTask(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Add failed");
    }
  }
);

// ❌ Delete Task
export const removeTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteTask(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  }
);

// ✏️ Update Task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.updateTask(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 📥 FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ ADD
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload); // add on top
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ❌ DELETE
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (t) => t._id !== action.payload
        );
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✏️ UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;