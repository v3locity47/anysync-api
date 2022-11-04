import 'dotenv/config';
import express from 'express';
import { googleStrat, jwtStrat } from './config/passport';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { connectDB } from './config/db';
import { createServer } from 'http';
import Router from './routes/index';

const app = express();

const sessionConfig = {
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET',
};
app.use(express.json());
app.use(session(sessionConfig));
passport.use(googleStrat);
passport.use(jwtStrat);
app.use(passport.initialize());
app.use(passport.session());
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/', Router);
connectDB();

const httpServer = createServer(app);
httpServer.listen(process.env.PORT, () => {
  console.log(`Server Running on Port: ${process.env.PORT}`);
});
