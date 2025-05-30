import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import tweetController from "../controllers/tweet.controller";
import { checkBodyEmptyMiddleware } from "../middlewares/checkBodyEmpty.middleware";
import { validateUUIDParamMiddleware } from "../middlewares/validateUUIDParam.middleware";
import { validateCreateTweetMiddleware } from "../middlewares/validateCreateTweet.middleware";

const tweetRoutes = Router();

tweetRoutes.get("/:tweetId", authMiddleware, validateUUIDParamMiddleware("tweetId"), tweetController.getTweet);

tweetRoutes.post("/:tweetId/like", authMiddleware, validateUUIDParamMiddleware("tweetId"), tweetController.likeTweet);
tweetRoutes.delete(
  "/:tweetId/dislike",
  authMiddleware,
  validateUUIDParamMiddleware("tweetId"),
  tweetController.dislikeTweet
);

tweetRoutes.use(checkBodyEmptyMiddleware);
tweetRoutes.post("/", authMiddleware, validateCreateTweetMiddleware, tweetController.create);
tweetRoutes.post(
  "/:tweetId/reply",
  authMiddleware,
  validateUUIDParamMiddleware("tweetId"),
  validateCreateTweetMiddleware,
  tweetController.replyTweet
);

export default tweetRoutes;
