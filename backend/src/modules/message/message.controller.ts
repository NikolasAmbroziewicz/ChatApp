import mongoose from 'mongoose'
import { Server, Socket } from 'socket.io'
import moment from 'moment'

import { validateToken, getRoomId } from './message.utils'

import { BOT_NAME, USER_NAME } from './consts'

import { findUser } from '../user/user.service'
import { createMessage, findMessages, updateMessage } from './message.service'

import { 
  DeleteMessageType,
  MessageType, 
  UpdateMessageType 
} from './types'

export async function joinRoomController(socket: Socket) {
  const { decoded } = validateToken(socket)

  if (decoded?._id) {
    const roomId = getRoomId(socket) as string

    socket.join(roomId)

    const user = await findUser({_id: String(decoded._id)})
    const messages = await findMessages(roomId)

    socket.emit('previous-messages', messages.map((message) => ({
      _id: message._id,
      type: USER_NAME,
      user: {
        _id: message.user._id,
        name: message.user.name,
      },
      date: moment(message.createdAt).format('h:mm a'),
      message: message.content,
      authorId: message.user._id
    })))

    socket.emit('message', {
      type: BOT_NAME,
      user: BOT_NAME,
      date: moment().format('h:mm a'),
      message: `Welcome ${user?.name} to chat!`
    })

    socket.broadcast.to(roomId).emit('message', {
      type: BOT_NAME,
      user: BOT_NAME,
      date: moment().format('h:mm a'),
      message: `${user?.name} has join the chat`
    })
  }
}

export async function addMessageController(
  io: Server,
  socket: Socket, 
  data: MessageType
) {
  const { decoded } = validateToken(socket)

  if (decoded?._id) {
    const user = await findUser({_id: String(decoded._id)})
    const message = await createMessage({
      user: user?._id,
      chat: data.room,
      content: data.message
    })

    io.to(data.room).emit('message', {
      _id: message._id,
      type: USER_NAME,
      user: {
        _id: message.user,
        name: user?.name,
      },
      date: moment().format('h:mm a'),
      message: data.message,
    })
  }
}

export async function updateMessageController(
  io: Server,
  socket: Socket,
  data: UpdateMessageType,
) {
  if (!mongoose.Types.ObjectId.isValid(data.messageId)) {
    socket.emit('error', {
      error:'Invalid Message Id'
    })
  } else {
    const roomId = getRoomId(socket) as string
  
    const message = await updateMessage({ 
      _id: data.messageId 
    }, {
      content: data.content
    }, {})

    io.to(roomId).emit('delete-message', {
      _id: message?._id,
      type: USER_NAME,
      user: {
        _id: message?.user._id,
        name: message?.user.name,
      },
      date: moment().format('h:mm a'),
      message: message?.content,
    })
  }
}

export async function deleteMessageController(
  io: Server,
  socket: Socket,
  data: DeleteMessageType
) {
  if(!mongoose.Types.ObjectId.isValid(data.messageId)) {
    socket.emit('error', {
      error:'Invalid Message Id'
    })
  } else {
    const roomId = getRoomId(socket) as string
  
    const message = await updateMessage({ 
      _id: data.messageId 
    }, {
      content: null
    }, {})

    io.to(roomId).emit('delete-message', {
      _id: message?._id,
      type: USER_NAME,
      user: {
        _id: message?.user._id,
        name: message?.user.name,
      },
      date: moment().format('h:mm a'),
      message: message?.content,
    })
  }
}

export async function userTypingController(
  socket: Socket,
) {
  const { decoded } = validateToken(socket)
  
  if(decoded?._id) {
    const user = await findUser({_id: String(decoded._id)})

    socket.broadcast.to(getRoomId(socket) as string).emit('user-typing', {
      _id: user?._id,
      name: user?.name
    })
  }
}

export async function disconnectController (
  socket: Socket
) {
  const { decoded } = validateToken(socket)

  if (decoded?._id) {
    const user = await findUser({_id: String(decoded._id)})

    socket.broadcast.to(getRoomId(socket) as string).emit('message', {
      type: BOT_NAME,
      user: BOT_NAME,
      date: moment().format('h:mm a'),
      message: `${user?.name} has left the chat`
    })
  }
}