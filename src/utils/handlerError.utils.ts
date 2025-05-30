import { Prisma } from "@prisma/client";
import { Response } from "express";
import { AppError } from "../model/appError.model";
import { ResultDto } from "../dtos/result.dto";

export function handlerError(error: Error, res: Response): Response<ResultDto> {
  let result: ResultDto;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    result = {
      success: false,
      code: 500,
      message: error.message,
    };
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    result = {
      success: false,
      code: 400,
      message: error.message,
    };
  } else if (error instanceof AppError) {
    result = {
      success: false,
      code: error.code,
      message: error.message,
    };
  } else {
    result = {
      success: false,
      code: 500,
      message: error.message,
    };
  }

  return res.status(result.code).send(result);
}
