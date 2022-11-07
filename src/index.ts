import 'dotenv/config';
import express from 'express';
import { googleStrat, jwtStrat } from './config/passport';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { connectDB } from './config/db';
import { createServer } from 'http';
import MongoStore from 'connect-mongo';
import Router from './routes/index';

const app = express();

const sessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_URI });
// app.set('trust proxy', 1);
const sessionConfig = {
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET',
  store: sessionStore,
  // cookie: { secure: false, sameSite: false },
};
app.use(express.json());
app.use(session(sessionConfig));
app.use((req, res, next) => {
  console.log(req.query);
  const { redirect_uri: redirectUrl } = req.query;
  console.log(`REDIRECT ${redirectUrl}`);

  if (req.session && redirectUrl) {
    req.session.redirectUrl = String(redirectUrl);
  }
  req.session.save((err) => {
    if (err) {
      return res.send('err');
    }
    return next();
  });
  console.log(req.session);
});
passport.use(googleStrat);
// passport.use(jwtStrat);
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
