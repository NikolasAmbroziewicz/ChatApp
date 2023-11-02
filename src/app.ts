import express from "express"
import config from 'config'

import logger from "./utils/logger"
import connect from "./utils/connect"

import deserializeUser from './middleware/deserializeUser'

import routes from "./routes"


const APP_PORT = config.get<number>('port')

const app = express()

app.use(express.json())
app.use(deserializeUser)

app.listen(APP_PORT, async () => {
  logger.info(`App is Running at http://localhost:${APP_PORT}`)

  await connect();

  routes(app);
})