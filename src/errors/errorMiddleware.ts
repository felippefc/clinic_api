import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export async function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ message });
}