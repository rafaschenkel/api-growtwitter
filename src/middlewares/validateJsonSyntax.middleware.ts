import { Request, Response, NextFunction } from "express";
import { AppError } from "../model/appError.model";
import { handlerError } from "../utils/handlerError.utils";

export function validateJsonSyntax(err: any, req: Request, res: Response, next: NextFunction) {
  try {
    if (err instanceof SyntaxError && "body" in err) {
      throw new AppError(400, "Invalid JSON syntax in request body");
    }

    next();
  } catch (error: any) {
    handlerError(error, res);
  }
}
