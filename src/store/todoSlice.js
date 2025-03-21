    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appwritetodo from "../appwrite/todo_appwrite";

    // Fetch Todos
    export const fetchTodos = createAsyncThunk('todos/fetchTodo', async (userId) => {
        return await appwritetodo.getTodo(userId);
    });

    // Create Todo
    export const createTodos = createAsyncThunk('todos/createTodo', async ({ userId, title,name }) => {
        return await appwritetodo.createTodo(userId, title,name);
    });

    // Delete Todo
    export const deleteTodos = createAsyncThunk("todos/deleteTodo", async (todoId) => {
        await appwritetodo.deleteTodo(todoId);
        return todoId;
    });

    // Update Todo
    export const updateTodo = createAsyncThunk("todos/updateTodo", async ({ todoId, title }) => {
        await appwritetodo.updateTodo(todoId, title);
        return { todoId, title };
    });

    const todoSlice = createSlice({
        name: 'todos',
        initialState: { items: [], status: 'idle' },
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchTodos.fulfilled, (state, action) => {
                    state.items = action.payload;
                })
                .addCase(createTodos.fulfilled, (state, action) => {
                    state.items.push(action.payload);
                })
                .addCase(deleteTodos.fulfilled, (state, action) => {
                    state.items = state.items.filter(todo => todo.$id !== action.payload);
                })
                .addCase(updateTodo.fulfilled, (state, action) => {
                    const { todoId, title } = action.payload;
                    const index = state.items.findIndex(todo => todo.$id === todoId);
                    if (index !== -1) {
                        state.items[index].title = title;
                    }
                });
        }
    });

    export default todoSlice.reducer;
