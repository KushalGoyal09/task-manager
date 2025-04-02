import { PrismaClient } from "@prisma/client";
import type { Response } from "../types";
import { verifyPassword } from "../utils/hash";
import { getToken } from "../utils/jwt";
const db = new PrismaClient();

export const login = async (
  username: string,
  password: string
): Promise<Response<string>> => {
  try {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return {
        success: false,
        message: "Incorrect password",
        data: null,
      };
    }
    const token = getToken(user.id);
    return {
      success: true,
      message: "User registered successfully",
      data: token,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: "An error occurred during registration",
      data: null,
    };
  }
};
