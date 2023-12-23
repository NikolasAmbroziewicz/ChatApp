import { Server } from 'socket.io'
import { Server as HTTPServer } from 'http'

import { 
  addMessageController, 
  deleteMessageController, 
  disconnectController, 
  joinRoomController, 
  updateMessageController 
} from './message.controller'

import { validateToken } from './message.utils'

import { 
  DeleteMessageType,
  MessageType, 
  UpdateMessageType 
} from './types'

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
    socket.on('join-room', async () => {
      joinRoomController(socket)
    })

    socket.on('chat-message', async (data: MessageType) => {
      addMessageController(io, socket, data)
    })

    socket.on('update-message', async (data: UpdateMessageType) => {
      updateMessageController(io, socket, data)
    })

    socket.on('delete-message',async (data: DeleteMessageType) => {
      deleteMessageController(io, socket, data)
    })

    socket.on('disconnect', async () => {
      disconnectController(socket)
    })
  })
}