import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appwritetodo from "../appwrite/todo_appwrite";

// Fetch subtasks
export const fetchSubTasks = createAsyncThunk("subtasks/fetchSubTasks", async (taskId) => {
    return await appwritetodo.getSubTask(taskId);
});

// Create a subtask
export const createSubTask = createAsyncThunk("subtasks/createSubTask", async ({ taskId, content }) => {
    return await appwritetodo.addSubTask(taskId, content);
});

// Delete a subtask
export const deleteSubTask = createAsyncThunk("subtasks/deleteSubTask", async (subtaskId) => {
    await appwritetodo.deleteSubTask(subtaskId);
    return subtaskId;
});

// Update a subtask
export const updateSubTask = createAsyncThunk("subtasks/updateSubTask", async ({ subtaskId, content }) => {
    await appwritetodo.updateSubTask(subtaskId, content);
    return { subtaskId, content };
});

const subtaskSlice = createSlice({
    name: "subtasks",
    initialState: { items: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubTasks.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(createSubTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteSubTask.fulfilled, (state, action) => {
                state.items = state.items.filter(subtask => subtask.$id !== action.payload);
            })
            .addCase(updateSubTask.fulfilled, (state, action) => {
                const { subtaskId, content } = action.payload;
                const index = state.items.findIndex(subtask => subtask.$id === subtaskId);
                if (index !== -1) {
                    state.items[index].content = content;
                }
            });
    }
});

export default subtaskSlice.reducer;