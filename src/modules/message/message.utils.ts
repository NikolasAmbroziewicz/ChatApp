import { Socket } from "socket.io"

import { verifyJwt } from "../../utils/jwt.utils"

export const validateToken = (socket: Socket) => {
  const accessToken = socket.handshake.auth.Authorization.split(' ')[1]

  const { valid, decoded } = verifyJwt(accessToken)

  return {
    valid,
    decoded 
  }
}

export const getRoomId = (socket: Socket) => {
  if (socket.handshake.query.roomId) {
    return socket.handshake.query.roomId
  } else {
    return null
  }
}