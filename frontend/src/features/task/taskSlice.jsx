import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./taskAPI";

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await api.getTasks();
  return res.data;
});

export const addTask = createAsyncThunk("tasks/add", async (data) => {
  const res = await api.createTask(data);
  return res.data;
});

export const removeTask = createAsyncThunk("tasks/delete", async (id) => {
  await api.deleteTask(id);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [] },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;