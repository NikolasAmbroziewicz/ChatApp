import { Express } from 'express';

import validateResource from '../../middleware/validateResource'
import requireUser from '../../middleware/requireUser'

import {
  deleteMessageController,
  getMessagesController,
  updateMessageController,
} from './message.controller'

import { chatParams, deleteMessageParams, updateMessagePayload } from './message.schema'

export function routes(app: Express) {
  app.get('/v1/api/message/:chatId', [requireUser, validateResource(chatParams)], getMessagesController)
  app.put('/v1/api/message/:messageId', [requireUser, validateResource(updateMessagePayload)], updateMessageController)
  app.delete('/v1/api/message/:messageId', [requireUser, validateResource(deleteMessageParams), deleteMessageController])
}

export default routes