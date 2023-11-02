import { Express } from 'express'

import validateResource from '../../middleware/validateResource'

import { 
  createUserHandler, 
  createUserSessionHandler
} from './user.controller'

import { createUserSchema } from './schema/user.schema'
import { createSessionSchema } from './schema/session.schema'

export function routes(app: Express) {
  app.post("/v1/api/user", validateResource(createUserSchema), createUserHandler)
  app.post("/v1/api/sessions", validateResource(createSessionSchema), createUserSessionHandler)
}

export default routes