import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  username: string;
  name: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  username: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        isLoggedIn: boolean;
        username: string;
        name: string;
      }>
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.name = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
