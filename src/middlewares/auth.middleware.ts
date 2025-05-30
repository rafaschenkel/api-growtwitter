import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../model/appError.model";
import { handlerError } from "../utils/handlerError.utils";
import { repository } from "../database/prismaClient";

interface Payload extends jwt.JwtPayload {
  userId?: string;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) throw new AppError(401, "Token not found");

    const token = authorization.replace("Bearer ", "");

    if (!token) throw new AppError(401, "Token not found");

    const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as Payload;

    if (!userId) throw new AppError(401, "Invalid token");

    const userExists = await repository.user.findUnique({ where: { id: userId } });
    if (!userExists) throw new AppError(404, "User not found or does not exist");

    req.userId = userExists.id;

    next();
  } catch (error: any) {
    handlerError(error, res);
  }
}
