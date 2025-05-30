import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateLoginMiddleware } from "../middlewares/validateLogin.middleware";
import { validateCreateUserMiddleware } from "../middlewares/validateCreateUser.middleware";
import { checkBodyEmptyMiddleware } from "../middlewares/checkBodyEmpty.middleware";
import { validateUUIDParamMiddleware } from "../middlewares/validateUUIDParam.middleware";
import { checkFollowMiddleware } from "../middlewares/checkFollow.middleware";

const userRoutes = Router();

userRoutes.get("/feed", authMiddleware, userController.listUserFeedTweets);

userRoutes.get("/:userId", authMiddleware, validateUUIDParamMiddleware("userId"), userController.getUser);

userRoutes.post(
  "/follow/:followingId",
  authMiddleware,
  validateUUIDParamMiddleware("followingId"),
  checkFollowMiddleware,
  userController.follow
);
userRoutes.delete(
  "/follow/:followingId",
  authMiddleware,
  validateUUIDParamMiddleware("followingId"),
  checkFollowMiddleware,
  userController.unfollow
);

userRoutes.use(checkBodyEmptyMiddleware);
userRoutes.post("/", validateCreateUserMiddleware, userController.create);
userRoutes.post("/login", validateLoginMiddleware, userController.login);

export default userRoutes;
