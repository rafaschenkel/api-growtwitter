import { NextFunction, Request, Response } from "express";
import { handlerError } from "../utils/handlerError.utils";
import { AppError } from "../model/appError.model";
import { validate as isUUID } from "uuid";

export function validateUUIDParamMiddleware(paramName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const param = req.params[paramName];
      if (!isUUID(param)) throw new AppError(400, `${paramName} is not a valid UUID`);
      next();
    } catch (error: any) {
      handlerError(error, res);
    }
  };
}
