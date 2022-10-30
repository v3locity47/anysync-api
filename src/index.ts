import "dotenv/config";
import express, { Request, Response } from "express";
import { createServer } from "http";

const app = express();
app.use(express.json);

const httpServer = createServer(app);
httpServer.listen(8082, () => {
  console.log(`Server Running on Port: ${process.env.PORT}`);
});
