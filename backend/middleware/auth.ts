import type { Request, Response, NextFunction } from "express";
import { getUserId } from "../utils/jwt";
import type { AuthRequest } from "../types";

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({
      success: false,

      message: "No Authorization Header",
      statusCode: 401,
      description: "Unauthorized",
    });
    return;
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({
      success: false,
      message: "No token provided",
      statusCode: 401,
      description: "Unauthorized",
    });
    return;
  }

  try {
    const userId = getUserId(token);
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Invalid token",
      statusCode: 401,
      description: "Unauthorized",
    });
  }
};

export default authMiddleware;
