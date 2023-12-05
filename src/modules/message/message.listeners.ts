import { Server } from 'socket.io'
import { Server as HTTPServer } from 'http'
import moment from 'moment'

import { JoinRoomType, MessageType } from './types'

const BOT_NAME = 'Admin'

const formatMsg = (message: string) => {
  return {
    content: message,
    date: moment().format('h:mm a')
  }
}

export async function messageListeners(app: HTTPServer) {
  const io = new Server(app)

  io.on('connection', socket => {
    console.log('User Connected to chat')

    socket.on('join-room', (data: JoinRoomType) => {
      socket.join(data.room)

      socket.emit('message', {
        type: BOT_NAME,
        user: data.user,
        date: moment().format('h:mm a'),
        message: `Welcome to chat!`
      })

      socket.broadcast.to(data.room).emit('message', `${data.user} has join the chat`)
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
      console.log('Disconect')
    })
  })

  // io.on('connection', socket => {
  //   // Listen for Chat messages

  //   socket.on('joinRoom', (msg) => {

  //     console.log('join room', msg)

  //     socket.join(msg.room)
  //     // Welcome Current User
  //     socket.emit('message', 'Welcome to the Chat')

  //     //Brodcast when user connect
  //     socket.broadcast.to(msg.room).emit('message', 'A User has joined the chat')
  //   })

  //   socket.on('chatMessage', (msg) => {
  //     console.log('ChatMessage',msg)

  //     io.to(msg.room).emit('message', msg.content)
  //   })

  //   //Runs when client disconnect
  //   socket.on('disconnect', () => {
  //     io.emit('message', 'A User has left the chat')
  //   })
  // })
}