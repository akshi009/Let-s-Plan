import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appwritetodo from "../appwrite/todo_appwrite";

// Fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (todoId) => {
    const tasks = await appwritetodo.getTask(todoId);
    console.log("Fetched Tasks:", tasks);
    return Array.isArray(tasks) ? tasks : []; // Ensure it always returns an array
});



// Create task
export const createTask = createAsyncThunk("tasks/createTask", async ({ todoId, title}) => {
    return await appwritetodo.addTask(todoId, title );
});

// Delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId) => {
    await appwritetodo.deleteTask(taskId);
    return taskId;
});

// Update task ( Pass updated title & color)
export const updateTask = createAsyncThunk("tasks/updateTask", async ({ taskId, title, color }) => {
    console.log(title.typeof,"type3")
    await appwritetodo.updateTask(taskId, title, color);
    return { taskId, title, color };
});

const taskSlice = createSlice({
    name: "tasks",
    initialState: { items: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter(task => task.$id !== action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const { taskId, title, color } = action.payload;
                const index = state.items.findIndex(task => task.$id === taskId);
                if (index !== -1) {
                    state.items[index].title = title;
                    state.items[index].color = color;
                }
            });
    }
});

export default taskSlice.reducer;
