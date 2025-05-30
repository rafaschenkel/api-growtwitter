import { repository } from "../database/prismaClient";
import { ResultDto } from "../dtos/result.dto";
import { UserCreatedDto } from "../dtos/userCreated.dto";
import User from "../model/user.model";
import { AppError } from "../model/appError.model";
import { CreateUserDto } from "../dtos/createUser.dto";
import { hashPassword } from "../utils/hashPassword.utils";
import jwt, { SignOptions } from "jsonwebtoken";
import { comparePassword } from "../utils/comparePassword.utils";
import { LoginDto, LoginResponseDto } from "../dtos/login.dto";
import { FeedTweetDto } from "../dtos/feedTweetDto";
import { UserDto } from "../dtos/user.dto";

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
      success: true,
      code: 200,
      message: "User successfully logged in",
      data: { token, user: userWithoutPassword },
    };
  }
  public async create(data: CreateUserDto): Promise<ResultDto<UserCreatedDto>> {
    const hashedPassword = await hashPassword(data.password);
    const user = new User(data.name, data.username, data.email, hashedPassword, data.imgUrl);
    const result = await repository.user.create({
      data: user.toJSON(),
      select: { id: true, name: true, username: true, email: true, imgUrl: true, createdAt: true },
    });

    return {
      success: true,
      code: 201,
      message: "User successfully created",
      data: result,
    };
  }

  public async getUser(userId: string): Promise<ResultDto<UserDto>> {
    const result = await repository.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        imgUrl: true,
        createdAt: true,
        _count: { select: { tweets: true, following: true, followers: true } },
        tweets: {
          include: {
            _count: { select: { likes: true, replies: true } },
          },
          orderBy: { createdAt: "desc" },
        },
        followers: {
          select: { follower: { select: { id: true, name: true, username: true, imgUrl: true } } },
          orderBy: { followedAt: "desc" },
        },
        following: {
          select: { following: { select: { id: true, name: true, username: true, imgUrl: true } } },
          orderBy: { followedAt: "desc" },
        },
      },
    });

    if (!result) throw new AppError(404, "User not found");

    return {
      success: true,
      code: 200,
      message: "User successfully retrieved",
      data: result,
    };
  }

  public async listUserFeedTweets(userId: string): Promise<ResultDto<FeedTweetDto[]>> {
    const following = await repository.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((follow) => follow.followingId);
    followingIds.push(userId);

    const tweets = await repository.tweet.findMany({
      where: { userId: { in: followingIds } },
      include: {
        user: { select: { id: true, name: true, username: true, imgUrl: true } },
        _count: { select: { likes: true, replies: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      code: 200,
      message: "Feed tweets successfully retrieved",
      data: tweets,
    };
  }

  public async follow(userId: string, followingId: string): Promise<ResultDto> {
    const existingFollow = await repository.follow.findUnique({
      where: { followerId_followingId: { followerId: userId, followingId: followingId } },
    });

    if (existingFollow) throw new AppError(400, "User already followed");

    await repository.follow.create({
      data: { followerId: userId, followingId: followingId },
    });
    return {
      success: true,
      code: 200,
      message: "User successfully followed",
    };
  }

  public async unfollow(userId: string, followingId: string): Promise<ResultDto> {
    const existingFollow = await repository.follow.findUnique({
      where: { followerId_followingId: { followerId: userId, followingId: followingId } },
    });

    if (!existingFollow) throw new AppError(400, "User not followed");

    await repository.follow.deleteMany({
      where: { followerId: userId, followingId: followingId },
    });

    return {
      success: true,
      code: 200,
      message: "User successfully unfollowed",
    };
  }
}

export default new UserService();
