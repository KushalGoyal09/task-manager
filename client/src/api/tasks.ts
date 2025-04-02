import axios from "axios";
import { Response, Task } from "../types";

const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const addTask = async (task: {
  title: string;
  description: string | null;
}): Promise<Response<Task>> => {
  try {
    const token = getAuthToken();
    const { data } = await axios.post("/api/tasks", task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    return {
      success: false,
      message: "An error occurred",
      data: null,
    };
  }
};

export const editTask = async (
  task: {
    title: string;
    description: string | null;
    status: boolean;
  },
  taskId: string
): Promise<Response<Task>> => {
  try {
    const token = getAuthToken();
    const { data } = await axios.put(`/api/tasks/${taskId}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error editing task:", error);
    return {
      success: false,
      message: "An error occurred",
      data: null,
    };
  }
};

export const deleteTask = async (taskId: string): Promise<Response<null>> => {
  try {
    const token = getAuthToken();
    const { data } = await axios.delete(`/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    return {
      success: false,
      message: "An error occurred",
      data: null,
    };
  }
};

export const getTasks = async (): Promise<Response<Task[]>> => {
  try {
    const token = getAuthToken();
    const { data } = await axios.get("/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error getting tasks:", error);
    return {
      success: false,
      message: "An error occurred",
      data: null,
    };
  }
};
