import { Request, Response } from 'express'

import { createChat} from './chat.service'

import { CreateChatInput } from './chat.schema'

import logger from '../../utils/logger'

export async function createChatController(req: Request<{}, {}, CreateChatInput['body']>, res: Response) {
  try {
    const chat = await createChat(req.body)

    return res.send(chat.toJSON())
  } catch(e: any) {
    logger.error(e)
    return res.status(409).send(e.message)
  }
}