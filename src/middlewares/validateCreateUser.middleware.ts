import { NextFunction, Request, Response } from "express";
import { AppError } from "../model/appError.model";
import { validateFields } from "../utils/validateFields.utils";
import { handlerError } from "../utils/handlerError.utils";

export function validateCreateUserMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validateFields(req.body, ["name", "username", "email", "password"]);

    if (errors.length > 0) throw new AppError(400, errors.join("\n "));

    next();
  } catch (error: any) {
    handlerError(error, res);
  }
}
