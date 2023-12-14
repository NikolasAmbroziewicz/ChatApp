import moment from 'moment'

import { Server, Socket } from 'socket.io'
import { Server as HTTPServer } from 'http'

import { verifyJwt } from '../../utils/jwt.utils'
import { JoinRoomType, MessageType } from './types'

import { BOT_NAME, USER_NAME } from './consts'
import { findUser } from '../user/user.service'

const validateToken = (socket: Socket) => {
  const accessToken = socket.handshake.auth.Authorization.split(' ')[1]

  const { valid, decoded } = verifyJwt(accessToken)

  return {
    valid,
    decoded 
  }
}

const formatMsg = (message: string) => {
  return {
    content: message,
    date: moment().format('h:mm a')
  }
}

const getRoomId = (socket: Socket) => {
  if (socket.handshake.query.roomId) {
    return socket.handshake.query.roomId
  } else {
    return null
  }
}

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
        socket.join(getRoomId(socket) as string)

        const user = await findUser({_id: String(decoded._id)})

        socket.emit('message', {
          type: BOT_NAME,
          user: BOT_NAME,
          date: moment().format('h:mm a'),
          message: `Welcome ${user?.name} to chat!`
        })
  
        socket.broadcast.to(getRoomId(socket) as string).emit('message', {
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