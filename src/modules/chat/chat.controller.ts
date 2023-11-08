import { Request, Response } from 'express'

import { createChat } from './chat.service'

import { CreateChatInput } from './chat.schema'

import logger from '../../utils/logger'

export async function createChatController(req: Request<{}, {}, CreateChatInput['body']>, res: Response) {
  try {
    const userId = res.locals.user._id
    const chat = await createChat({...req.body, user: userId})

    return res.send(chat.toJSON())
  } catch(e: any) {
    logger.error(e)
    return res.status(409).send(e.message)
  }
}