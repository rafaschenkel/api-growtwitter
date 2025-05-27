import { Router } from "express";
import userController from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/", userController.create);
userRoutes.get("/search/:userId", userController.getUser);
userRoutes.get("/followings/:userId", userController.listFollowings);
userRoutes.get("/followers/:userId", userController.listFollowers);

export default userRoutes;
