import { NextFunction, Request, Response } from "express";
import { AppError } from "../model/appError.model";
import { handlerError } from "../utils/handlerError.utils";
import { validateFields } from "../utils/validateFields.utils";

export function validateLoginMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validateFields(req.body, ["login", "password"]);
    if (errors.length > 0) throw new AppError(400, errors.join("\n "));

    next();
  } catch (error: any) {
    handlerError(error, res);
  }
}
