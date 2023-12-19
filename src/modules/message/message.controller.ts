import mongoose from 'mongoose'
import { Request, Response } from 'express'

import { findMessages, updateMessage } from "./message.service"

import { ChatInput, UpdateMessageInput } from './message.schema'

import { USER_NAME } from './consts'

export async function getMessagesController(
  req: Request<ChatInput['params']>, 
  res: Response
  ) {
  const chatId = req.params.chatId

  if(!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(403).send({
      message: 'Invalid Chat Id'
    })
  }

  const messages = await findMessages(chatId)

  return res.send(messages.map((message) => ({
    _id: message._id,
    type: USER_NAME,
    user: {
      _id: message.user._id,
      name: message.user.name,
    },
    date: message.createdAt,
    message: message.content,
    authorId: message.user._id
  })))
}

export async function deleteMessageController(
  req: Request<UpdateMessageInput['params']>,
  res: Response
) {
  const messageId = req.params.messageId

  if(!mongoose.Types.ObjectId.isValid(messageId)) {
    return res.status(403).send({
      message: 'Invalid Message Id'
    })
  }

  const message = await updateMessage({ 
    _id: messageId 
  }, {
    content: null
  }, {})

  return res.send(message)
}

export async function updateMessageController(
  req: Request<UpdateMessageInput['params']>,
  res: Response
) {
  const messageId = req.params.messageId
  const body = req.body

  if(!mongoose.Types.ObjectId.isValid(messageId)) {
    return res.status(403).send({
      message: 'Invalid Message Id'
    })
  }

  const message = await updateMessage({ 
    _id: messageId 
  }, body, {})

  return res.send(message)
}