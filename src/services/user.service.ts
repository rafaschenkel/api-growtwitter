import { repository } from "../database/prismaClient";
import { FollowingDto, FollowerDto } from "../dtos/follow.dto";
import { ResultDto } from "../dtos/result.dto";
import { UserDto } from "../dtos/user.dto";
import User from "../model/user.model";
import { AppError } from "../model/userError";

class UserService {
  public async create(user: User): Promise<ResultDto<UserDto>> {
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
      select: { follower: { select: { id: true, username: true } } },
    });

    if (result.length === 0) throw new AppError(404, "This user has no followers");

    return {
      code: 200,
      message: "Followers successfully retrieved",
      data: result,
    };
  }
}

export default new UserService();
