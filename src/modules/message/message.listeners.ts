import moment from 'moment'
import { Server } from 'socket.io'
import { Server as HTTPServer } from 'http'

import { findUser } from '../user/user.service'
import { validateToken, getRoomId } from './message.utils'

import { BOT_NAME, USER_NAME } from './consts'
import { JoinRoomType, MessageType } from './types'
import { createMessage, findMessages } from './message.service'

export async function messageListeners(app: HTTPServer) {
  const io = new Server(app)

  io.use(async (socket, next) => {
    const { valid } = validateToken(socket)

    if (valid) {
      next();
    } else {
      next(new Error("invalid"));
    }
  });

  io.on('connection', socket => {
    socket.on('join-room', async (data: JoinRoomType) => {
      const { decoded } = validateToken(socket)
      
      if (decoded?._id) {
        const roomId = getRoomId(socket) as string

        socket.join(roomId)

        const user = await findUser({_id: String(decoded._id)})
        const messages = await findMessages(roomId)

        socket.emit('previous-messages', messages.map((message) => ({
          type: USER_NAME,
          user: {
            _id: message.user._id,
            name: message.user.name,
          },
          date: message.createdAt,
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
    })

    socket.on('chat-message', async (data: MessageType) => {
      const { decoded } = validateToken(socket)

      if (decoded?._id) {
        const user = await findUser({_id: String(decoded._id)})
        await createMessage({
          user: user?._id,
          chat: data.room,
          content: data.message
        })

        io.to(data.room).emit('message', {
          type: USER_NAME,
          user: user?.name,
          date: moment().format('h:mm a'),
          message: data.message,
          authorId: decoded._id 
        })
      }
    })

    socket.on('disconnect', async () => {
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
    })
  })
}