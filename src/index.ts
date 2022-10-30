import "dotenv/config";
import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import { createServer } from "http";

const app = express();
app.use(express.json);

const httpServer = createServer(app);
connectDB();
httpServer.listen(8082, () => {
  console.log(`Server Running on Port: ${process.env.PORT}`);
});
