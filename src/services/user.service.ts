import { repository } from "../database/prismaClient";
import { FollowingDto, FollowerDto } from "../dtos/follow.dto";
import { ResultDto } from "../dtos/result.dto";
import { UserDto } from "../dtos/user.dto";
import User from "../model/user.model";
import { AppError } from "../model/appError";
import { CreateUserDto } from "../dtos/createUser.dto";
import { hashPassword } from "../utils/hashPassword.utils";
import jwt, { SignOptions } from "jsonwebtoken";
import { comparePassword } from "../utils/comparePassword.utils";
import { LoginDto, LoginResponseDto } from "../dtos/login.dto";
import { TweetDto } from "../dtos/tweet.dto";

class UserService {
  public async login(data: LoginDto): Promise<ResultDto<LoginResponseDto>> {
    const user = await repository.user.findFirst({
      where: { OR: [{ email: data.login }, { username: data.login }] },
    });
    if (!user) throw new AppError(401, "Invalid email/username or password credentials");

    const passwordvalid = await comparePassword(data.password, user.password);
    if (!passwordvalid) throw new AppError(401, "Invalid email/username or password credentials");

    const signOptions = { expiresIn: process.env.JWT_EXPIRES_IN } as SignOptions;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: signOptions.expiresIn,
    });

    const { password, ...userWithoutPassword } = user;
    return {
      code: 200,
      message: "User successfully logged in",
      data: { token, user: userWithoutPassword },
    };
  }
  public async create(data: CreateUserDto): Promise<ResultDto<UserDto>> {
    const hashedPassword = await hashPassword(data.password);
    const user = new User(data.username, data.email, hashedPassword);
    const result = await repository.user.create({ data: user.toJSON(), omit: { password: true } });

    return {
      code: 201,
      message: "User successfully created",
      data: result,
    };
  }

  public async getUser(userId: string): Promise<ResultDto<UserDto>> {
    const result = await repository.user.findUnique({
      where: { id: userId },
      omit: { password: true },
      include: {
        _count: { select: { tweets: true, following: true, followers: true } },
      },
    });

    if (!result) throw new AppError(404, "User not found");

    return {
      code: 200,
      message: "User successfully retrieved",
      data: result,
    };
  }

  public async listFollowings(userId: string): Promise<ResultDto<FollowingDto[]>> {
    const result = await repository.follow.findMany({
      where: { followerId: userId },
      select: { following: { select: { id: true, username: true } } },
    });

    if (result.length === 0) throw new AppError(404, "This user does not follow anyone");

    return {
      code: 200,
      message: "Followings successfully retrieved",
      data: result,
    };
  }

  public async listFollowers(userId: string): Promise<ResultDto<FollowerDto[]>> {
    const result = await repository.follow.findMany({
      where: { followingId: userId },
      select: {
        follower: {
          select: { id: true, username: true, _count: { select: { following: true, followers: true, tweets: true } } },
        },
      },
    });

    if (result.length === 0) throw new AppError(404, "This user has no followers");

    return {
      code: 200,
      message: "Followers successfully retrieved",
      data: result,
    };
  }

  public async listFollowingTweets(userId: string): Promise<ResultDto<TweetDto[]>> {
    const result = await repository.follow.findMany({
      where: { followerId: userId },
      select: { following: { select: { tweets: { include: { user: { select: { id: true, username: true } } } } } } },
    });

    const tweets = result.flatMap((follow) => follow.following.tweets);

    return {
      code: 200,
      message: "Following tweets successfully retrieved",
      data: tweets,
    };
  }

  public async follow(userId: string, followingId: string) {
    const existingFollow = await repository.follow.findUnique({
      where: { followerId_followingId: { followerId: userId, followingId: followingId } },
    });

    if (existingFollow) throw new AppError(400, "User already followed");

    await repository.follow.create({
      data: { followerId: userId, followingId: followingId },
    });
    return {
      code: 200,
      message: "User successfully followed",
    };
  }

  public async unfollow(userId: string, followingId: string) {
    const existingFollow = await repository.follow.findUnique({
      where: { followerId_followingId: { followerId: userId, followingId: followingId } },
    });

    if (!existingFollow) throw new AppError(400, "User not followed");

    await repository.follow.deleteMany({
      where: { followerId: userId, followingId: followingId },
    });

    return {
      code: 200,
      message: "User successfully unfollowed",
    };
  }
}

export default new UserService();
