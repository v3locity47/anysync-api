import MongoStore from 'connect-mongo';
const sessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_URI });

export const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: 'SECRET',
  store: sessionStore,
};
