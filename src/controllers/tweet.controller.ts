import { Request, Response } from "express";
import { handlerError } from "../utils/handlerError.utils";
import { CreateTweetDto } from "../dtos/createTweet.dto";
import tweetService from "../services/tweet.service";
import { CreateReplyTweetDto } from "../dtos/createReplyTweet.dto";

class TweetController {
  public async create(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { content } = req.body;
      const tweet: CreateTweetDto = { userId, content };
      const result = await tweetService.create(tweet);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }

  public async replyTweet(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const parentTweetId = req.params.tweetId;
      const { content } = req.body;
      const reply: CreateReplyTweetDto = { parentTweetId, userId, content };
      const result = await tweetService.replyTweet(reply);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }

  public async getTweet(req: Request, res: Response) {
    try {
      const { tweetId } = req.params;
      const result = await tweetService.getTweet(tweetId);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }

  public async likeTweet(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { tweetId } = req.params;
      const result = await tweetService.likeTweet(userId, tweetId);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }

  public async dislikeTweet(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { tweetId } = req.params;
      const result = await tweetService.dislikeTweet(userId, tweetId);
      res.status(result.code).send(result);
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}

export default new TweetController();
