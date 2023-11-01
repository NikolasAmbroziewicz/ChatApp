import { Express, Request, Response } from 'express'

import UserRouter from './modules/user/user.routes'

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  UserRouter(app);
}

export default routes