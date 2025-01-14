import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import taskSlice  from "./features/taskSlice";


export const makeStore = () => { 
  return configureStore({
    reducer: {
      user: userSlice,
      task: taskSlice,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']