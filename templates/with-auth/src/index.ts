import "dotenv/config";
import express, { Express } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoute";
import taskRouter from "./routes/taskRoute";

(async () => {
  const app: Express = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req, res) => {
    res.send("Hello World");
  });

  //Routes
  app.use("/api/auth", authRouter);
  app.use("/api/tasks", taskRouter);

  await mongoose.connect("mongodb://localhost:27017/todo");
  console.log("Connected to MongoDB");

  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
})();
