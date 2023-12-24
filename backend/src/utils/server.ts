import express from 'express';

import config from 'config';
import cors from 'cors';
import deserializeUser from '../middleware/deserializeUser';

import routes from "../routes";

function createServer() {
  const app = express()

  app.use(express.json())
  app.use(deserializeUser)

  app.use(
    cors({
      origin: config.get("origin"),
      credentials: true,
      exposedHeaders: ['x-access-token', 'x-access-time-token']
    })
  )
  
  routes(app);

  return app
}

export default createServer