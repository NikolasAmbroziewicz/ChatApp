import { Express } from 'express';

import validateResource from '../../middleware/validateResource'
import requireUser from '../../middleware/requireUser'

import {
  deleteMessageController,
  updateMessageController,
} from './message.controller'

import { deleteMessageParams, updateMessagePayload } from './message.schema'

export function routes(app: Express) {

  app.put('/v1/api/message/:messageId', [requireUser, validateResource(updateMessagePayload)], updateMessageController)
  app.delete('/v1/api/message/:messageId', [requireUser, validateResource(deleteMessageParams), deleteMessageController])
}

export default routes