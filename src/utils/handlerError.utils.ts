import { Prisma } from "@prisma/client";
import { Response } from "express";
import { AppError } from "../model/appError";

export function handlerError(error: Error, res: Response) {
  let result;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    result = {
      code: 500,
      message: error.message,
    };
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    result = {
      code: 400,
      message: error.message,
    };
  } else if (error instanceof AppError) {
    result = {
      code: error.code,
      message: error.message,
    };
  } else {
    result = {
      code: 500,
      message: error.message,
    };
  }

  return res.status(result.code).send(result);
}
