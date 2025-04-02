import { PrismaClient } from "@prisma/client";
import type { Response } from "../types";
const db = new PrismaClient();

interface User {
  id: string;
  username: string;
  name: string;
}

export const getMe = async (userId: string): Promise<Response<User>> => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    return {
      success: true,
      message: "User found",
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to find user",
      data: null,
    };
  }
};
