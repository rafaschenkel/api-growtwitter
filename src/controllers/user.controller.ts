import { Request, Response } from "express";
import userService from "../services/user.service";
import User from "../model/user.model";
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

  public async listFollowingTweets(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const result = await userService.listFollowingTweets(userId);
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
