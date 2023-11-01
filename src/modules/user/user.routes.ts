import { Express } from 'express'

import validateResource from '../../middleware/validateResource'

import { createUserSchema } from './user.schema'
import { createUserHandler } from './user.controller'

export function routes(app: Express) {
  app.post("/v1/api/user", validateResource(createUserSchema), createUserHandler)
}

export default routes