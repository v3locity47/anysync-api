import { default as Redis } from 'ioredis';

const endpoint = process.env.REDIS_ENDPOINT;
const port = Number(process.env.REDIS_PORT);
const password = process.env.REDIS_PASSWORD;

const RedisClient = new Redis({
  port: port,
  host: endpoint,
  password: password,
});

export { RedisClient };
