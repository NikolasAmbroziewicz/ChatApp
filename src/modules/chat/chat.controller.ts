import { Request, Response, query } from 'express'
import mongoose from 'mongoose'

import { 
  createChat, 
  findAndUpdateChat, 
  findChat, 
  findChats,
  deleteChat
} from './chat.service'

import { 
  CreateChatInput, 
  UpdateChatInput, 
  DeleteChatInput 
} from './chat.schema'

import logger from '../../utils/logger'
import ChatModel from './chat.model'

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
      message: 'Invalid Chat Id'
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

export async function getChatController(
  req: Request,
  res: Response
) {
  const chats = await findChats()
  return res.send(chats)
}

export async function deleteChatController(
  req: Request<DeleteChatInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const chatId = req.params.chatId

  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(403).send({
      message: 'Invalid Chat Id'
    })
  }

  const product = await findChat({ _id: chatId });

  if (String(product?.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteChat({ _id: chatId })

  return res.sendStatus(200);
}