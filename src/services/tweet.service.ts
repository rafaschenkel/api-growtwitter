import { repository } from "../database/prismaClient";
import { CreateReplyTweetDto } from "../dtos/createReplyTweet.dto";
import { CreateTweetDto } from "../dtos/createTweet.dto";
import { ResultDto } from "../dtos/result.dto";
import { TweetDto } from "../dtos/tweet.dto";
import { TweetCreatedDto } from "../dtos/tweetCreated.dto";
import { AppError } from "../model/appError.model";
import Tweet from "../model/tweet.model";

class TweetService {
  public async create(data: CreateTweetDto): Promise<ResultDto<TweetCreatedDto>> {
    const tweet = new Tweet(data.userId, data.content);
    const result = await repository.tweet.create({
      data: tweet.toJSON(),
    });
    return {
      success: true,
      code: 201,
      message: "Tweet successfully created",
      data: result,
    };
  }
  public async replyTweet(data: CreateReplyTweetDto): Promise<ResultDto<TweetCreatedDto>> {
    const parentTweet = await repository.tweet.findUnique({ where: { id: data.parentTweetId } });
    if (!parentTweet) throw new AppError(404, "Parent tweet not found");

    const tweet = new Tweet(data.userId, data.content, data.parentTweetId);
    const result = await repository.tweet.create({
      data: tweet.toJSON(),
    });
    return {
      success: true,
      code: 201,
      message: "Reply tweet successfully created",
      data: result,
    };
  }

  public async getTweet(tweetId: string): Promise<ResultDto<TweetDto>> {
    const result = await repository.tweet.findUnique({
      where: { id: tweetId },
      include: {
        user: { select: { id: true, name: true, username: true, imgUrl: true } },
        replies: {
          include: {
            user: { select: { id: true, name: true, username: true, imgUrl: true } },
            _count: { select: { likes: true, replies: true } },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { likes: true, replies: true } },
      },
    });
    if (!result) throw new AppError(404, "Tweet not found");
    return {
      success: true,
      code: 200,
      message: "Tweet successfully retrieved",
      data: result,
    };
  }

  public async likeTweet(userId: string, tweetId: string): Promise<ResultDto> {
    const tweet = await repository.tweet.findUnique({ where: { id: tweetId } });
    if (!tweet) throw new AppError(404, "Tweet not found");

    const existinglike = await repository.tweetLike.findUnique({
      where: { userId_tweetId: { userId, tweetId } },
    });
    if (existinglike) throw new AppError(400, "Tweet already liked");

    await repository.tweetLike.create({ data: { userId, tweetId } });

    return {
      success: true,
      code: 200,
      message: "Tweet successfully liked",
    };
  }

  public async dislikeTweet(userId: string, tweetId: string): Promise<ResultDto> {
    const tweet = await repository.tweet.findUnique({ where: { id: tweetId } });
    if (!tweet) throw new AppError(404, "Tweet not found");

    const existinglike = await repository.tweetLike.findUnique({
      where: { userId_tweetId: { userId, tweetId } },
    });
    if (!existinglike) throw new AppError(400, "Tweet not liked");

    await repository.tweetLike.delete({ where: { userId_tweetId: { userId, tweetId } } });

    return {
      success: true,
      code: 200,
      message: "Tweet successfully disliked",
    };
  }
}

export default new TweetService();
