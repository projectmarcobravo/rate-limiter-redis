import { AppError } from "../utilites/errors";
import { NextFunction, Request, Response } from "express";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  let token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token missing" });
  }
  next();
};
