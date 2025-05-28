import jwt from "jsonwebtoken";
import express, { NextFunction, Response } from "express";
import { AppError } from "../model/appError";
import { handlerError } from "../utils/handlerError.utils";

interface Payload extends jwt.JwtPayload {
  userId: string;
}

export async function authMiddleware(req: express.Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new AppError(401, "Token not found");

    const token = authorization.replace("Bearer ", "");

    if (!token) throw new AppError(401, "Token not found");

    const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as Payload;

    req.userId = userId;

    next();
  } catch (error: any) {
    handlerError(error, res);
  }
}
