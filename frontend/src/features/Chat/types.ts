export type MessageType = {
  type: string,
  user: string,
  date: string,
  message: string,
  authorId?: boolean
}

export type JoinRoomType = {
  room: string,
  user: string
}