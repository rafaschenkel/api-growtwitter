import { Request, Response } from "express";
import userService from "../services/user.service";
import { handlerError } from "../utils/handlerError.utils";
import { CreateUserDto } from "../dtos/createUser.dto";
import { LoginDto } from "../dtos/login.dto";
class UserController {
  public async login(req: Request, res: Response) {
    try {
      const { login, password } = req.body;
      const loginData: LoginDto = { login, password };
      const result = await userService.login(loginData);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }
  public async create(req: Request, res: Response) {
    try {
      const { name, username, email, password, imgUrl }: CreateUserDto = req.body;
      const user: CreateUserDto = { name, username, email, password, imgUrl };
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

  public async listUserFeedTweets(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const result = await userService.listUserFeedTweets(userId);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }

  public async follow(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { followingId } = req.params;
      const result = await userService.follow(userId, followingId);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }

  public async unfollow(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { followingId } = req.params;
      const result = await userService.unfollow(userId, followingId);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}

export default new UserController();
