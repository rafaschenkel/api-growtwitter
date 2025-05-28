import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = Router();

userRoutes.post("/", userController.create);
userRoutes.post("/login", userController.login);
userRoutes.get("/followingTweets", authMiddleware, userController.listFollowingTweets);

userRoutes.get("/:userId", userController.getUser);
userRoutes.get("/:userId/followings", userController.listFollowings);
userRoutes.get("/:userId/followers", userController.listFollowers);

userRoutes.post("/follow/:followingId", authMiddleware, userController.follow);
userRoutes.delete("/unfollow/:followingId", authMiddleware, userController.unfollow);

export default userRoutes;
