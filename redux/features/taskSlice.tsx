import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskState } from "@/types/taskInterface"; 
import { TaskData } from "@/data/TaskData";


const initialState:TaskState[] = TaskData;

export const taskSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTask : (state , action: PayloadAction<TaskState>) => {
        state.push(action.payload);
    },
    setTasks: (state , action: PayloadAction<TaskState[]>) => {
        state = action.payload
    },
    clearTask : (state) => {
    }
  }
});

export const { addTask , clearTask , setTasks } = taskSlice.actions;
export default taskSlice.reducer;