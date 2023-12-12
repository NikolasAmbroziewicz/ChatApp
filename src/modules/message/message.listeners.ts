import config from 'config'
import moment from 'moment'

import { Server } from 'socket.io'
import { Server as HTTPServer } from 'http'

import Redis from "ioredis"

import { verifyJwt } from '../../utils/jwt.utils'
import { JoinRoomType, MessageType } from './types'

const REDIS_URI =  config.get<string>('redisUri')
const redis = new Redis(REDIS_URI);
const BOT_NAME = 'Admin'

const formatMsg = (message: string) => {
  return {
    content: message,
    date: moment().format('h:mm a')
  }
}

export async function messageListeners(app: HTTPServer) {
  const io = new Server(app)

  io.use(async (socket, next) => {
    const accessToken = socket.handshake.auth.Authorization.split(' ')[1]

    const { valid } = verifyJwt(accessToken)

    console.log('valid', valid)

    if (valid) {
      next();
    } else {
      next(new Error("invalid"));
    }
  });

  io.on('connection', socket => {
    socket.on('join-room', async (data: JoinRoomType) => {
      socket.join(data.room)
      const userExist = await redis.lpos(data.room, data.user)

      if(userExist === null) {
        await redis.lpush(data.room, data.user)

        socket.emit('message', {
          type: BOT_NAME,
          user: data.user,
          date: moment().format('h:mm a'),
          message: `Welcome to chat!`
        })
  
        socket.broadcast.to(data.room).emit('message', `${data.user} has join the chat`)
      } else {
        console.log('userExist', userExist)
      }
    })

    socket.on('chat-message', (data: MessageType) => {
      io.to(data.room).emit('message', {
        type: 'User',
        user: data.user,
        date: moment().format('h:mm a'),
        message: data.message
      })
    })

    socket.on('disconnect', () => {
      // Remover User from Redis room
      console.log('Disconect')
    })
  })
}