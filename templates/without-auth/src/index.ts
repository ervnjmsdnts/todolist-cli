import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";

import taskRouter from "./routes/taskRoute";

(async () => {
  const app: Express = express();

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req, res) => {
    res.send("Hello World");
  });

  app.use("/api/tasks/", taskRouter);

  await mongoose.connect("mongodb://localhost:27017/noauthtodo");
  console.log("Connected to MongoDB");

  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
})();
