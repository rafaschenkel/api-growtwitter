import express from "express";
import cors from "cors";
import dotEnv from "dotenv";

dotEnv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
