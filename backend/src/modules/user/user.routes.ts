import { Express } from 'express'

import validateResource from '../../middleware/validateResource'

import { 
  createUserHandler, 
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler
} from './user.controller'

import { createUserSchema } from './schema/user.schema'
import { createSessionSchema } from './schema/session.schema'

import requireUser from '../../middleware/requireUser'

export function routes(app: Express) {
  app.post("/v1/api/user", validateResource(createUserSchema), createUserHandler)
  app.post("/v1/api/sessions", validateResource(createSessionSchema), createUserSessionHandler)
  app.get("/v1/api/sessions", requireUser, getUserSessionsHandler)
  app.delete("/v1/api/sessions", requireUser, deleteUserSessionHandler)
}

export default routes