import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvatarState } from "@/types/avatarInterface";
import { avatarData } from "@/data/AvatarData";


const initialState:AvatarState[] = avatarData;

export const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
  }
});

export const {} = avatarSlice.actions;
export default avatarSlice.reducer;