import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/types/userInterface";
import { userData } from "@/data/UserData";


const initialState:UserState[] = userData;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser : (state , action: PayloadAction<UserState>) => {
        state = [...state , action.payload];
        return state;
    },
    setUser: (state , action: PayloadAction<UserState[]>) => {
        state = action.payload
    },
    clearUser : (state) => {
    }
  }
});

export const { addUser , clearUser , setUser } = userSlice.actions;
export default userSlice.reducer;