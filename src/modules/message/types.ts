export type JoinRoomType = {
  room: string,
  user: string
}

export type MessageType = {
  room: string,
  user: string,
  message: string
}

export type DeleteMessageType = {
  messageId: string
}