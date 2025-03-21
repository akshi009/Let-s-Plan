import { configureStore } from "@reduxjs/toolkit";

import authreducer from "./authstore";
import subtasksreducer from './subtaskSlice';
import tasksreducer from './taskSlice';
import todoreducer from './todoSlice';

const store = configureStore({
    reducer:{
        auth:authreducer,
        todos:todoreducer,
        subtasks:subtasksreducer,
        tasks:tasksreducer
    }
})

export default store