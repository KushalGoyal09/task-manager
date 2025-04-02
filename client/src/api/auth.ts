import axios from "axios";
import { Response, User } from "../types";

export const login = async (
  email: string,
  password: string
): Promise<Response<string>> => {
  try {
    const { data } = await axios.post("/api/auth/login", { email, password });
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "An error occurred",
      data: null,
    };
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<Response<null>> => {
  try {
    const { data } = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Error registering:", error);
    return {
      success: false,
      message: "An error occurred",
      data: null,
    };
  }
};

export const getMe = async (): Promise<Response<User>> => {
  try {
    const { data } = await axios.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error getting user:", error);
    return {
      success: false,
      message: "An error occurred",
      data: null,
    };
  }
};
