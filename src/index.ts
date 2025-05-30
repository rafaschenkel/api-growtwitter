import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import userRoutes from "./routes/user.route";
import tweetRoutes from "./routes/tweet.routes";
import { validateJsonSyntax } from "./middlewares/validateJsonSyntax.middleware";
import { checkBodyEmptyMiddleware } from "./middlewares/checkBodyEmpty.middleware";

dotEnv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(validateJsonSyntax);
app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
