import { Express } from 'express'

import validateResource from '../../middleware/validateResource'

import requireUser from '../../middleware/requireUser'

import { createChatSchema, updateChatSchema, deleteChatSchema } from './chat.schema'

import { 
  createChatController,
  deleteChatController,
  updateChatController,
  getChatController
} from './chat.controller'

export function routes(app: Express) {
  app.post('/v1/api/chat', [requireUser, validateResource(createChatSchema)], createChatController)
  app.get('/v1/api/chat', [requireUser], getChatController)
  app.put('/v1/api/chat/:chatId', [requireUser, validateResource(updateChatSchema)], updateChatController)
  app.delete('/v1/api/chat/:chatId', [requireUser, validateResource(deleteChatSchema)], deleteChatController)
  
}

export default routes