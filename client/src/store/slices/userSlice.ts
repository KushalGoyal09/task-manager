import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as UserAPI from "@/api/auth";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  console.log("fetchUser");
  const response = await UserAPI.getMe();
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    username: "", 
    isLoading: true,
  },
  reducers: {
    logout: () => ({
      isLoggedIn: false,
      username: "",
      isLoading: false,
    }),
    setUser: (_, action) => ({
      isLoggedIn: action.payload.isLoggedIn,
      username: action.payload.username,
      isLoading: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(fetchUser.fulfilled, (_, action) => {
        return {
          isLoggedIn: !!action.payload?.username,
          username: action.payload?.username || "",
          isLoading: false,
        };
      })
      .addCase(fetchUser.rejected, () => {
        return {
          isLoggedIn: false,
          username: "",
          isLoading: false,
        };
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
