export type JoinRoomType = {
  room: string,
  user: string
}

export type MessageType = {
  room: string,
  user: string,
  message: string
}

export interface DeleteMessageType {
  messageId: string
}

export interface UpdateMessageType extends DeleteMessageType {
  content: string
}