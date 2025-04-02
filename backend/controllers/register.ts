import { PrismaClient } from "@prisma/client";
import type { Response } from "../types";
import { hashPassword } from "../utils/hash";
const db = new PrismaClient();

export const register = async (
  name: string,
  username: string,
  password: string
): Promise<Response<null>> => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Username already exists",
        data: null,
      };
    }

    const hashedPassword = await hashPassword(password);

    await db.user.create({
      data: {
        name: name,
        username: username,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User registered successfully",
      data: null,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      success: false,
      message: "An error occurred during registration",
      data: null,
    };
  }
};
