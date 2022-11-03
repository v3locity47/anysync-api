import "dotenv/config";
import express, { Request, Response } from "express";
import { googleStrat } from "./config/passport";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { connectDB } from "./config/db";
import { createServer } from "http";
import AuthRouter from "./routes/authRoutes";

const app = express();
passport.use(googleStrat);

const sessionConfig = {
  resave: false,
  saveUninitialized: true,
  secret: "SECRET",
};
app.use(express.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/", AuthRouter);
connectDB();

const httpServer = createServer(app);
httpServer.listen(process.env.PORT, () => {
  console.log(`Server Running on Port: ${process.env.PORT}`);
});
