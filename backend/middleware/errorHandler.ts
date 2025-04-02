import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: "somthing is wrong",
    description: "Internal server error",
    statusCode: 500,
  });
  return;
};
