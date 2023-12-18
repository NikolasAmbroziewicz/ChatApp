import { Express, Request, Response } from 'express'

import UserRouter from './modules/user/user.routes'
import ChatRouter from './modules/chat/chat.routes'
import MessageRouter from './modules/message/message.routes'

function routes(app: Express) {
  app.get('/v1/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  UserRouter(app);
  ChatRouter(app);
  MessageRouter(app);
}

export default routes