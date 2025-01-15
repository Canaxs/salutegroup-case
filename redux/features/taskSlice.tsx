import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskState } from "@/types/taskInterface"; 
import { TaskData } from "@/data/TaskData";
import { IdAndStatus } from "@/types/IdAndStatus";
import { act } from "react";


const initialState:TaskState[] = TaskData;

export const taskSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTask : (state , action: PayloadAction<TaskState>) => {
        state = [...state , action.payload];
        return state;
    },
    setTasks: (state , action: PayloadAction<TaskState[]>) => {
        state = action.payload
        return state;
    },
    clearTask : (state) => {
    },
    updateTask : (state, action:PayloadAction<TaskState>) => {
        state = state.filter((task) => task.id !== action.payload.id);
        state.push(action.payload);
        return state;
    }
    
  }
});

export const { addTask , clearTask , setTasks , updateTask} = taskSlice.actions;
export default taskSlice.reducer;