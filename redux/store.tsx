import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import taskSlice from "./features/taskSlice";
import avatarSlice from "./features/avatarSlice";


export const makeStore = () => { 
  return configureStore({
    reducer: {
      user: userSlice,
      task: taskSlice,
      avatar: avatarSlice,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']