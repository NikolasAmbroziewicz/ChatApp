import config from 'config'

import logger from "./utils/logger"
import connect from "./utils/connect"

import createServer from "./utils/server"

const APP_PORT = config.get<number>('port')

const app = createServer()

app.listen(APP_PORT, async () => {
  logger.info(`App is Running at http://localhost:${APP_PORT}`)

  await connect();
})