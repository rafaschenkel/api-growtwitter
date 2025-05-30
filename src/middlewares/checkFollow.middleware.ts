import { NextFunction, Request, Response } from "express";
import { AppError } from "../model/appError.model";
import { handlerError } from "../utils/handlerError.utils";

export const checkFollowMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const { followingId } = req.params;
    if (userId === followingId) {
      throw new AppError(400, "You can't follow yourself");
    }
    next();
  } catch (error: any) {
    handlerError(error, res);
  }
};
