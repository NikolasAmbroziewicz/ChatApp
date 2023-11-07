import { Express } from 'express'

import validateResource from '../../middleware/validateResource'

import requireUser from '../../middleware/requireUser'

import { createChatSchema } from './chat.schema'

import { 
  createChatController,
} from './chat.controller'

export function routes(app: Express) {
  app.post('/v1/api/chat', [requireUser, validateResource(createChatSchema)], createChatController)
}

export default routes