import { Express } from 'express'

import validateResource from '../../middleware/validateResource'

import requireUser from '../../middleware/requireUser'

import { createChatSchema, updateChatSchema } from './chat.schema'

import { 
  createChatController,
  updateChatController
} from './chat.controller'

export function routes(app: Express) {
  app.post('/v1/api/chat', [requireUser, validateResource(createChatSchema)], createChatController)
  app.put('/v1/api/chat/:chatId', [requireUser, validateResource(updateChatSchema)], updateChatController)
}

export default routes