import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { createChat, findAndUpdateChat, findChat } from './chat.service'

import { CreateChatInput, UpdateChatInput } from './chat.schema'

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

export async function updateChatController(
  req: Request<UpdateChatInput['params']>, 
  res: Response
) {
  const userId = res.locals.user._id
  const chatId = req.params.chatId
  const update = req.body

  if(!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(403).send({
      message: 'Invalid Id'
    })
  }

  const product = await findChat({ _id: chatId })

  if(!product) {
    res.status(404).send({
      message: 'Product Not Found'
    })
  }

  if(String(product?.user) !== userId) {
    res.status(403).send({
      message: 'Can not perform this action'
    })
  }

  const updateProduct = await findAndUpdateChat({ _id: chatId }, update, { new: true});

  return res.send(updateProduct)
} 