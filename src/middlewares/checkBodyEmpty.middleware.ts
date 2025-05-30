import { Request, Response, NextFunction } from "express";
import { AppError } from "../model/appError.model";
import { handlerError } from "../utils/handlerError.utils";

export function checkBodyEmptyMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new AppError(400, "Body is empty");
    }

    next();
  } catch (error: any) {
    handlerError(error, res);
  }
}
