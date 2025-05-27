import { Request, Response } from "express";
import userService from "../services/user.service";
import User from "../model/user.model";
import { handlerError } from "../utils/handlerError.utils";
import { CreateUserDto } from "../dtos/createUser.dto";
class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user: CreateUserDto = { username, email, password };
      const result = await userService.create(user);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }

  public async getUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await userService.getUser(userId);

      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }

  public async listFollowings(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await userService.listFollowings(userId);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }

  public async listFollowers(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await userService.listFollowers(userId);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}

export default new UserController();
