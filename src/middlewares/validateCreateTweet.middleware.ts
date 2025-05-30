import { NextFunction, Request, Response } from "express";
import { validateFields } from "../utils/validateFields.utils";
import { AppError } from "../model/appError.model";
import { handlerError } from "../utils/handlerError.utils";

export function validateCreateTweetMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validateFields(req.body, ["content"]);

    if (errors.length > 0) throw new AppError(400, errors.join("\n "));

    next();
  } catch (error: any) {
    handlerError(error, res);
  }
}
